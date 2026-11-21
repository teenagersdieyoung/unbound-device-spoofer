import React from 'react';
import { cloneElement } from 'react';
import { flux, metro, patcher, toasts } from '@unbound-app/api';
import { getActiveSpoofConfig } from '../lib/gateway';
import { getSetting } from '../lib/storage';
import { PlatformBadge } from '../components/PlatformBadge';

let dispatcherListener: Function | null = null;
let lastJoinedChannel: string | null = null;

function getCurrentUserId(): string | null {
	try {
		const UserStore = flux.getStore('User') as any;
		return UserStore?.getCurrentUser?.()?.id ?? null;
	} catch {
		return null;
	}
}

/**
 * Listens for Voice Channel join events to notify user of active spoof
 */
export function initVoiceListener(): void {
	const Dispatcher = flux.dispatcher as any;
	if (!Dispatcher || typeof Dispatcher.subscribe !== 'function') return;

	dispatcherListener = (action: any) => {
		if (action.type === 'VOICE_CHANNEL_SELECT') {
			const channelId = action.channelId;
			if (channelId && channelId !== lastJoinedChannel) {
				lastJoinedChannel = channelId;
				const config = getActiveSpoofConfig();
				const showToast = getSetting('vcJoinToast');

				if (config && showToast) {
					toasts.show({
						title: 'Connected to Voice Chat',
						content: `Joined voice channel spoofed as ${config.label} ${config.glyph}`,
					});
				}
			} else if (!channelId) {
				lastJoinedChannel = null;
			}
		}
	};

	try {
		Dispatcher.subscribe('VOICE_CHANNEL_SELECT', dispatcherListener);
	} catch (e) {
		console.warn('[DeviceSpoof] Voice channel dispatcher subscription failed:', e);
	}
}

export function cleanupVoiceListener(): void {
	const Dispatcher = flux.dispatcher as any;
	if (Dispatcher && dispatcherListener && typeof Dispatcher.unsubscribe === 'function') {
		try {
			Dispatcher.unsubscribe('VOICE_CHANNEL_SELECT', dispatcherListener);
		} catch {}
	}
	dispatcherListener = null;
	lastJoinedChannel = null;
}

/**
 * Injects the platform device badge into Voice Channel participant lists
 */
export function patchVoiceChannelRows(): void {
	// Look for Discord mobile voice user components
	const VoiceUserComponent =
		metro.findByName('VoiceUser') ??
		metro.findByDisplayName('VoiceUser') ??
		metro.findByFilePath('VoiceUser.tsx') ??
		metro.findByFilePath('modules/voice/native/VoiceUser.tsx') ??
		metro.findByFilePath('VoiceChannelParticipant.tsx') ??
		null;

	if (!VoiceUserComponent) {
		console.log('[DeviceSpoof] VoiceUser component will be decorated dynamically via voice states');
		return;
	}

	try {
		patcher.react.after(VoiceUserComponent, 'default', ({ props, result }) => {
			const voiceSpoofEnabled = getSetting('voiceSpoof');
			if (!voiceSpoofEnabled || !result) return result;

			const myId = getCurrentUserId();
			const userId = props?.user?.id ?? props?.userId;
			const config = getActiveSpoofConfig();

			if (!config || !userId) return result;

			// If it's the current user, attach our active spoof badge
			if (userId === myId) {
				const badge = (
					<PlatformBadge
						key="voice-spoof-badge"
						platformId={config.id}
						size={14}
						showPill={true}
					/>
				);

				const element = result as React.ReactElement<any>;
				const children = element.props?.children;

				if (children === undefined) {
					return (
						<>
							{result}
							{badge}
						</>
					);
				}

				return cloneElement(element, {
					children: [...[children].flat(), badge],
				});
			}

			return result;
		});
		console.log('[DeviceSpoof] Voice channel participant component patched');
	} catch (e) {
		console.warn('[DeviceSpoof] Could not patch VoiceUser component:', e);
	}
}
