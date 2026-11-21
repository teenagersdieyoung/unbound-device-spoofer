import { patcher, metro } from '@unbound-app/api';
import { patchGateway, unpatchGateway } from './patches/socket';
import { patchPresence } from './patches/presence';
import { initVoiceListener, cleanupVoiceListener, patchVoiceChannelRows } from './patches/voice';
import { patchMemberList } from './patches/member-list';
import { patchUserProfile } from './patches/profile';
import { forceIdentify, getGatewayModule } from './lib/gateway';

export function start(): void {
	console.log('[DeviceSpoof] Plugin starting...');

	// 1. Initialize Gateway socket interception
	patchGateway();

	// 2. Patch internal Presence & Sessions stores for local sync
	patchPresence();

	// 3. Initialize Voice Chat listeners & Voice User Row patches
	initVoiceListener();
	patchVoiceChannelRows();

	// 4. Initialize Member List & Profile UI patches
	patchMemberList();
	patchUserProfile();

	// 5. Pre-fetch author profile so Discord caches username & avatar
	try {
		const AsyncUsers =
			(metro as any)?.api?.AsyncUsers ??
			(metro as any)?.findByProps?.('getUser', 'fetchProfile');
		AsyncUsers?.getUser?.('349721444466294785');
	} catch (e) {
		console.warn('[DeviceSpoof] Pre-fetch user skipped:', e);
	}

	// 6. Force a fresh IDENTIFY if already connected so spoof takes immediate effect
	const Gateway = getGatewayModule();
	if (Gateway?.isConnected?.()) {
		console.log('[DeviceSpoof] Client already connected. Triggering initial re-identify...');
		forceIdentify();
	}

	console.log('[DeviceSpoof] Plugin started successfully!');
}

export function stop(): void {
	console.log('[DeviceSpoof] Plugin stopping...');

	// Clean up voice listeners
	cleanupVoiceListener();

	// Unpatch gateway socket
	unpatchGateway();

	// Remove all React & function patches registered with Unbound patcher
	patcher.unpatchAll();

	// Force re-identify to restore genuine authentic device properties
	const Gateway = getGatewayModule();
	if (Gateway?.isConnected?.()) {
		forceIdentify();
	}

	console.log('[DeviceSpoof] Plugin stopped and restored to default state.');
}

export { SettingsPanel } from './settings';
