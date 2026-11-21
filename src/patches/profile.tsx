import React from 'react';
import { cloneElement, type ReactElement } from 'react';
import { flux, metro, patcher } from '@unbound-app/api';
import { getActiveSpoofConfig } from '../lib/gateway';
import { getSetting } from '../lib/storage';
import { PlatformBadge } from '../components/PlatformBadge';

function getCurrentUserId(): string | null {
	try {
		const UserStore = flux.getStore('User') as any;
		return UserStore?.getCurrentUser?.()?.id ?? null;
	} catch {
		return null;
	}
}

export function patchUserProfile(): void {
	const UserProfilePrimaryInfo =
		metro.findByFilePath('modules/user_profile/native/UserProfilePrimaryInfo.tsx') ??
		metro.findByName('UserProfilePrimaryInfo') ??
		null;

	if (!UserProfilePrimaryInfo) {
		console.warn('[DeviceSpoof] UserProfilePrimaryInfo module not found, skipping profile patch');
		return;
	}

	try {
		patcher.react.after(UserProfilePrimaryInfo, 'default', ({ props, result }) => {
			const enabled = getSetting('profileBadge');
			if (!enabled || !result) return result;

			const myId = getCurrentUserId();
			const userId = props?.user?.id ?? props?.userId;
			const config = getActiveSpoofConfig();

			if (!config || !userId || userId !== myId) return result;

			const badge = (
				<PlatformBadge
					key="profile-spoof-badge"
					platformId={config.id}
					size={18}
					showPill={true}
					showLabel={true}
				/>
			);

			const element = result as ReactElement<any>;
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
		});
		console.log('[DeviceSpoof] UserProfilePrimaryInfo patched');
	} catch (e) {
		console.warn('[DeviceSpoof] Could not patch UserProfilePrimaryInfo:', e);
	}
}
