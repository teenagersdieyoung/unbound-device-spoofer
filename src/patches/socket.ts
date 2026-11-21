import { patcher } from '@unbound-app/api';
import { getGatewayModule, getSocket, patchSocket, unpatchSocket } from '../lib/gateway';

export function patchGateway(): void {
	const Gateway = getGatewayModule();
	if (!Gateway) {
		console.warn('[DeviceSpoof] Gateway module not found. Retrying lazily...');
		return;
	}

	// Patch initial socket if available
	const socket = getSocket();
	if (socket) {
		patchSocket(socket);
	}

	// Also hook getSocket to intercept any future socket instances created after reconnects
	if (typeof Gateway.getSocket === 'function') {
		patcher.after(Gateway, 'getSocket', ({ result }) => {
			if (result) patchSocket(result);
			return result;
		});
	}

	console.log('[DeviceSpoof] Gateway manager initialized');
}

export function unpatchGateway(): void {
	unpatchSocket();
}
