import { storage } from '@unbound-app/api';
import type { PlatformId } from './constants';

export interface PluginSettings {
	platform: PlatformId;
	voiceSpoof: boolean;
	memberListBadge: boolean;
	profileBadge: boolean;
	vcJoinToast: boolean;
}

const DEFAULT_SETTINGS: PluginSettings = {
	platform: 'meta', // Default to Meta Quest / VR as highlighted by user request
	voiceSpoof: true,
	memberListBadge: true,
	profileBadge: true,
	vcJoinToast: true,
};

const BUCKET_NAME = 'unbound.device-spoof';

export function getBucket() {
	return storage.getBucket(BUCKET_NAME);
}

export function getSetting<K extends keyof PluginSettings>(key: K): PluginSettings[K] {
	try {
		const bucket = getBucket();
		return bucket.get(key, DEFAULT_SETTINGS[key]);
	} catch {
		return DEFAULT_SETTINGS[key];
	}
}

export function setSetting<K extends keyof PluginSettings>(key: K, value: PluginSettings[K]): void {
	try {
		const bucket = getBucket();
		bucket.set(key, value);
	} catch (err) {
		console.error('[DeviceSpoof] Failed to save setting:', key, err);
	}
}

export function getAllSettings(): PluginSettings {
	return {
		platform: getSetting('platform'),
		voiceSpoof: getSetting('voiceSpoof'),
		memberListBadge: getSetting('memberListBadge'),
		profileBadge: getSetting('profileBadge'),
		vcJoinToast: getSetting('vcJoinToast'),
	};
}
