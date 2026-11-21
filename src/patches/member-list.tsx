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

export function patchMemberList(): void {
	const UserRow =
		metro.findByFilePath('modules/main_tabs_v2/native/shared_components/user_list/UserRow.tsx') ??
		metro.findByName('UserRow') ??
		null;

	if (!UserRow) {
		console.warn('[DeviceSpoof] UserRow module not found, skipping member list patch');
		return;
	}

	try {
		patcher.react.after(UserRow, 'default', ({ props, result }) => {
			const enabled = getSetting('memberListBadge');
			if (!enabled || !result) return result;

			const myId = getCurrentUserId();
			const userId = props?.user?.id ?? props?.userId;
			const config = getActiveSpoofConfig();

			if (!config || !userId || userId !== myId) return result;

			const badge = (
				<PlatformBadge
					key="member-list-spoof-badge"
					platformId={config.id}
					size={14}
					showPill={true}
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
		console.log('[DeviceSpoof] Member list UserRow patched');
	} catch (e) {
		console.warn('[DeviceSpoof] Could not patch UserRow:', e);
	}
}
