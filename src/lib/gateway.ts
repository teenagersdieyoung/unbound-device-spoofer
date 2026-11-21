import { flux, metro } from '@unbound-app/api';
import { PLATFORMS, type PlatformConfig } from './constants';
import { getSetting } from './storage';

const OP_IDENTIFY = 2;
const OP_VOICE_STATE_UPDATE = 4;

let origSend: Function | null = null;
let currentSocket: any = null;

export function getGatewayModule(): any | null {
	return (
		metro.findByProps('getSocket', 'isConnected') ??
		metro.findByProps('getSocket') ??
		null
	);
}

export function getSocket(): any | null {
	const mod = getGatewayModule();
	return mod?.getSocket?.() ?? null;
}

export function getActiveSpoofConfig(): PlatformConfig | null {
	const platformId = getSetting('platform');
	if (platformId === 'off') return null;
	return PLATFORMS[platformId] ?? null;
}

export function patchSocket(socket: any): void {
	if (!socket || socket.__deviceSpoofPatched) return;

	origSend = socket.send.bind(socket);

	socket.send = function (op: number, data: any, ...args: any[]) {
		if (op === OP_IDENTIFY && data?.properties) {
			const config = getActiveSpoofConfig();
			if (config?.properties) {
				// Inject the spoofed client properties
				Object.assign(data.properties, config.properties);

				// Also inject deprecated legacy dollar keys if present in Discord's payload
				if ('$os' in data.properties) data.properties.$os = config.properties.os;
				if ('$browser' in data.properties) data.properties.$browser = config.properties.browser;
				if ('$device' in data.properties) data.properties.$device = config.properties.device;

				console.log(
					`[DeviceSpoof] Intercepted IDENTIFY -> Spoofed as: ${config.label} (${config.properties.browser} / ${config.properties.os})`
				);
			}
		}

		return origSend!.apply(this, [op, data, ...args]);
	};

	socket.__deviceSpoofPatched = true;
	currentSocket = socket;
	console.log('[DeviceSpoof] Gateway socket successfully patched');
}

export function unpatchSocket(): void {
	if (currentSocket && origSend) {
		currentSocket.send = origSend;
		delete currentSocket.__deviceSpoofPatched;
		console.log('[DeviceSpoof] Gateway socket unpatched');
	}
	origSend = null;
	currentSocket = null;
}

/**
 * Forces Discord to cleanly re-identify with the new platform properties.
 * Clears sessionId & sequence number so Discord sends an IDENTIFY (op 2) instead of RESUME (op 6).
 */
export function forceIdentify(): boolean {
	const socket = getSocket();
	if (!socket) {
		console.warn('[DeviceSpoof] Cannot force re-identify: Gateway socket not found');
		return false;
	}

	if (!socket.__deviceSpoofPatched) {
		patchSocket(socket);
	}

	// Nulling sessionId forces Discord Gateway to discard the existing session
	// and run a fresh IDENTIFY packet rather than a RESUME handshake.
	socket.sessionId = null;
	socket.seq = 0;

	const ws = socket.webSocket;
	if (ws && typeof ws.close === 'function') {
		if (ws.readyState !== 2 && ws.readyState !== 3) {
			// ReadyState 2 is CLOSING, 3 is CLOSED
			ws.close(1000);
			console.log('[DeviceSpoof] WebSocket closed (code 1000) for re-identify');
			return true;
		}
	} else if (typeof socket.close === 'function') {
		socket.close();
		setTimeout(() => socket.connect?.(), 300);
		return true;
	}

	return false;
}

export function getSocketStatus(): {
	connected: boolean;
	patched: boolean;
	sessionId: string | null;
	currentPlatform: string;
} {
	const socket = getSocket();
	const config = getActiveSpoofConfig();
	return {
		connected: !!socket?.isConnected?.(),
		patched: !!socket?.__deviceSpoofPatched,
		sessionId: socket?.sessionId ? String(socket.sessionId).slice(0, 8) + '...' : 'None (Ready to Identify)',
		currentPlatform: config ? config.label : 'Disabled / Real Device',
	};
}
