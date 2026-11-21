import { flux, patcher } from '@unbound-app/api';
import { getActiveSpoofConfig, getSocket } from '../lib/gateway';

function getCurrentUserId(): string | null {
	try {
		const UserStore = flux.getStore('User') as any;
		return UserStore?.getCurrentUser?.()?.id ?? null;
	} catch {
		return null;
	}
}

export function patchPresence(): void {
	const PresenceStore = flux.getStore('Presence') as any;
	const SessionsStore = flux.getStore('Sessions') as any;

	if (PresenceStore && typeof PresenceStore.getClientStatus === 'function') {
		patcher.after(PresenceStore, 'getClientStatus', ({ args: [userId], result }) => {
			const config = getActiveSpoofConfig();
			if (!config || !config.properties) return result;

			const myId = getCurrentUserId();
			if (myId && userId === myId) {
				const clientKey = config.client === 'default' ? 'mobile' : config.client;
				return {
					...(result || {}),
					[clientKey]: 'online',
				};
			}

			return result;
		});
	}

	if (SessionsStore && typeof SessionsStore.getSessions === 'function') {
		patcher.after(SessionsStore, 'getSessions', ({ result }) => {
			const config = getActiveSpoofConfig();
			if (!config || !config.properties || !result || typeof result !== 'object') return result;

			const socket = getSocket();
			const activeSessionId = socket?.sessionId;

			const modified = { ...result };
			for (const [id, session] of Object.entries(modified as Record<string, any>)) {
				if (!activeSessionId || id === activeSessionId) {
					modified[id] = {
						...session,
						clientInfo: {
							...(session?.clientInfo || {}),
							client: config.client === 'default' ? 'mobile' : config.client,
							os: config.properties.os,
						},
					};
				}
			}

			return modified;
		});
	}

	console.log('[DeviceSpoof] Presence & SessionsStore patched');
}
