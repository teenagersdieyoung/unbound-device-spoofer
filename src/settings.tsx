import React, { useState } from 'react';
import { ui, toasts } from '@unbound-app/api';
import { PLATFORMS, type PlatformId } from './lib/constants';
import { getSetting, setSetting } from './lib/storage';
import { forceIdentify, getSocketStatus } from './lib/gateway';
import { DevicePreview } from './components/DevicePreview';

export function SettingsPanel() {
	const [platform, setPlatformState] = useState<PlatformId>(() => getSetting('platform'));
	const [voiceSpoof, setVoiceSpoofState] = useState<boolean>(() => getSetting('voiceSpoof'));
	const [memberListBadge, setMemberListState] = useState<boolean>(() =>
		getSetting('memberListBadge')
	);
	const [profileBadge, setProfileBadgeState] = useState<boolean>(() => getSetting('profileBadge'));
	const [vcJoinToast, setVcJoinToastState] = useState<boolean>(() => getSetting('vcJoinToast'));
	const [socketInfo, setSocketInfo] = useState(() => getSocketStatus());

	const handlePlatformChange = (newPlatform: PlatformId) => {
		setPlatformState(newPlatform);
		setSetting('platform', newPlatform);

		// Automatically force clean re-identification on platform change
		const ok = forceIdentify();
		setTimeout(() => setSocketInfo(getSocketStatus()), 500);

		const config = PLATFORMS[newPlatform];
		toasts.show({
			title: 'Platform Updated',
			content: `Now spoofing as ${config.label} ${config.glyph}`,
		});
	};

	const handleManualReconnect = () => {
		const success = forceIdentify();
		setTimeout(() => setSocketInfo(getSocketStatus()), 500);

		if (success) {
			toasts.show({
				title: 'Gateway Reconnected',
				content: 'A fresh IDENTIFY packet was transmitted with current spoof properties.',
			});
		} else {
			toasts.show({
				title: 'Gateway Reconnect',
				content: 'Waiting for Gateway socket to re-establish connection...',
			});
		}
	};

	return (
		<ui.Page>
			{/* Live Active Preview Card */}
			<ui.Section title="ACTIVE SPOOF PREVIEW">
				<DevicePreview platformId={platform} />
				<ui.ButtonRow
					label="Force Gateway Re-Identify"
					subLabel="Triggers immediate handshake so Voice Channels and profiles update instantly"
					variant="primary"
					onPress={handleManualReconnect}
				/>
			</ui.Section>

			{/* VR Devices Section */}
			<ui.Section title="VIRTUAL REALITY (VR)">
				<ui.RadioRow
					label={PLATFORMS.meta.label}
					subLabel={PLATFORMS.meta.description}
					selected={platform === 'meta'}
					onPress={() => handlePlatformChange('meta')}
				/>
			</ui.Section>

			{/* Consoles Section */}
			<ui.Section title="GAMING CONSOLES">
				<ui.RadioRow
					label={PLATFORMS.xbox.label}
					subLabel={PLATFORMS.xbox.description}
					selected={platform === 'xbox'}
					onPress={() => handlePlatformChange('xbox')}
				/>
				<ui.RadioRow
					label={PLATFORMS.ps5.label}
					subLabel={PLATFORMS.ps5.description}
					selected={platform === 'ps5'}
					onPress={() => handlePlatformChange('ps5')}
				/>
				<ui.RadioRow
					label={PLATFORMS.ps4.label}
					subLabel={PLATFORMS.ps4.description}
					selected={platform === 'ps4'}
					onPress={() => handlePlatformChange('ps4')}
				/>
			</ui.Section>

			{/* Desktop Section */}
			<ui.Section title="DESKTOP & PC">
				<ui.RadioRow
					label={PLATFORMS.windows.label}
					subLabel={PLATFORMS.windows.description}
					selected={platform === 'windows'}
					onPress={() => handlePlatformChange('windows')}
				/>
				<ui.RadioRow
					label={PLATFORMS.macos.label}
					subLabel={PLATFORMS.macos.description}
					selected={platform === 'macos'}
					onPress={() => handlePlatformChange('macos')}
				/>
				<ui.RadioRow
					label={PLATFORMS.linux.label}
					subLabel={PLATFORMS.linux.description}
					selected={platform === 'linux'}
					onPress={() => handlePlatformChange('linux')}
				/>
			</ui.Section>

			{/* Browser Section */}
			<ui.Section title="WEB BROWSERS">
				<ui.RadioRow
					label={PLATFORMS.web.label}
					subLabel={PLATFORMS.web.description}
					selected={platform === 'web'}
					onPress={() => handlePlatformChange('web')}
				/>
			</ui.Section>

			{/* Mobile Devices Section */}
			<ui.Section title="MOBILE DEVICES">
				<ui.RadioRow
					label={PLATFORMS.android.label}
					subLabel={PLATFORMS.android.description}
					selected={platform === 'android'}
					onPress={() => handlePlatformChange('android')}
				/>
				<ui.RadioRow
					label={PLATFORMS.ios.label}
					subLabel={PLATFORMS.ios.description}
					selected={platform === 'ios'}
					onPress={() => handlePlatformChange('ios')}
				/>
			</ui.Section>

			{/* Disable Spoofing */}
			<ui.Section title="RESTORE ORIGINAL">
				<ui.RadioRow
					label={PLATFORMS.off.label}
					subLabel={PLATFORMS.off.description}
					selected={platform === 'off'}
					onPress={() => handlePlatformChange('off')}
				/>
			</ui.Section>

			{/* Visual & Voice Chat Toggles */}
			<ui.Section title="DISPLAY & VOICE CHAT OPTIONS">
				<ui.SwitchRow
					label="Voice Chat (VC) Badges"
					subLabel="Displays your spoofed platform badge beside your name when connected to Voice Channels"
					value={voiceSpoof}
					onValueChange={(val: boolean) => {
						setVoiceSpoofState(val);
						setSetting('voiceSpoof', val);
					}}
				/>
				<ui.SwitchRow
					label="Voice Channel Join Alert"
					subLabel="Shows a confirmation toast notifying you of your active spoofed platform upon entering VC"
					value={vcJoinToast}
					onValueChange={(val: boolean) => {
						setVcJoinToastState(val);
						setSetting('vcJoinToast', val);
					}}
				/>
				<ui.SwitchRow
					label="Member List Badge"
					subLabel="Show platform indicator badge next to your username in server member lists"
					value={memberListBadge}
					onValueChange={(val: boolean) => {
						setMemberListState(val);
						setSetting('memberListBadge', val);
					}}
				/>
				<ui.SwitchRow
					label="User Profile Badge"
					subLabel="Show platform badge in user profile cards"
					value={profileBadge}
					onValueChange={(val: boolean) => {
						setProfileBadgeState(val);
						setSetting('profileBadge', val);
					}}
				/>
			</ui.Section>

			{/* Connection Diagnostics */}
			<ui.Section title="GATEWAY DIAGNOSTICS">
				<ui.TableRow
					label="Socket State"
					subLabel={socketInfo.connected ? 'Connected' : 'Connecting / Idle'}
				/>
				<ui.TableRow
					label="Active Session ID"
					subLabel={socketInfo.sessionId ?? 'None'}
				/>
				<ui.TableRow
					label="Socket Interceptor"
					subLabel={socketInfo.patched ? 'Active (Patched)' : 'Inactive'}
				/>
			</ui.Section>
		</ui.Page>
	);
}
