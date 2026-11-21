import React, { useState } from 'react';
import { ui, toasts, metro } from '@unbound-app/api';
import { PLATFORMS, type PlatformId } from './lib/constants';
import { getSetting, setSetting } from './lib/storage';
import { forceIdentify, getSocketStatus } from './lib/gateway';

interface ChoiceOption {
	value: string;
	label: string;
	subLabel?: string;
}

const SPOOF_OPTIONS: ChoiceOption[] = [
	{
		value: 'meta',
		label: 'Meta Quest / VR',
		subLabel: '🥽 Displays green VR headset pill badge in VC and profiles (vr)',
	},
	{
		value: 'xbox',
		label: 'Xbox (Series X|S, One)',
		subLabel: '🎮 Displays Xbox console badge in VC and profiles (Xbox Series X)',
	},
	{
		value: 'ps5',
		label: 'PlayStation 5',
		subLabel: '🎮 Displays PS5 console badge in VC and profiles (PlayStation 5)',
	},
	{
		value: 'ps4',
		label: 'PlayStation 4',
		subLabel: '🎮 Displays PS4 console badge in VC (PlayStation 4)',
	},
	{
		value: 'windows',
		label: 'PC (Windows Desktop)',
		subLabel: '💻 Discord Desktop for Windows (Discord Client)',
	},
	{
		value: 'macos',
		label: 'Mac (macOS Desktop)',
		subLabel: '🍏 Discord Desktop for macOS (Discord Client)',
	},
	{
		value: 'linux',
		label: 'Linux (Desktop)',
		subLabel: '🐧 Discord Desktop for Linux (Discord Client)',
	},
	{
		value: 'web',
		label: 'Web Browser',
		subLabel: '🌐 Discord Web Client (Google Chrome)',
	},
	{
		value: 'android',
		label: 'Android Mobile',
		subLabel: '📱 Discord Android Client',
	},
	{
		value: 'ios',
		label: 'iOS / iPhone',
		subLabel: '📱 Discord iOS Client',
	},
	{
		value: 'off',
		label: 'Disabled (Genuine Device)',
		subLabel: '❌ Do not spoof; use genuine client properties',
	},
];

/**
 * Cleanly reloads the Discord client to enforce the spoofed device handshake.
 */
function restartDiscord(): void {
	toasts?.show?.({
		title: 'Restarting Discord...',
		content: 'Reloading Discord bundle to apply spoof properties...',
	});

	setTimeout(() => {
		try {
			// 1. Try Unbound's native reload
			const u = (typeof unbound !== 'undefined' ? unbound : (globalThis as any).unbound) as any;
			if (typeof u?.native?.reload === 'function') {
				u.native.reload();
				return;
			}

			// 2. Try native BundleUpdaterManager via React Native NativeModules
			const rn = (globalThis as any).ReactNative || (window as any).ReactNative;
			const bum = rn?.NativeModules?.BundleUpdaterManager;
			if (typeof bum?.reload === 'function') {
				bum.reload();
				return;
			}

			// 3. Try finding BundleUpdaterManager via metro lookups
			const metroBum = metro?.findByProps?.('reload', 'getInitialBundleDownloaded') as any;
			if (typeof metroBum?.reload === 'function') {
				metroBum.reload();
				return;
			}

			// 4. Fallback: Force identify if reload unavailable
			forceIdentify();
		} catch (e) {
			console.error('[DeviceSpoof] Restart error:', e);
			forceIdentify();
		}
	}, 250);
}

class SettingsErrorBoundary extends React.Component<
	{ children: React.ReactNode },
	{ hasError: boolean; error: any }
> {
	constructor(props: { children: React.ReactNode }) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: any) {
		return { hasError: true, error };
	}

	componentDidCatch(error: any, errorInfo: any) {
		console.error('[DeviceSpoof] SettingsPanel render crash:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			const Section = ui?.Section;
			const ButtonRow = ui?.ButtonRow;

			if (Section && ButtonRow) {
				return (
					<Section title="Settings Error Encountered">
						<ButtonRow
							label="Tap to Recover Settings"
							subLabel={String(this.state.error?.message || 'Recovering UI...')}
							onPress={() => this.setState({ hasError: false, error: null })}
						/>
					</Section>
				);
			}
			return null;
		}

		return this.props.children;
	}
}

function SettingsContent() {
	const [platform, setPlatformState] = useState<PlatformId>(() => getSetting('platform'));
	const [voiceSpoof, setVoiceSpoofState] = useState<boolean>(() => getSetting('voiceSpoof'));
	const [memberListBadge, setMemberListState] = useState<boolean>(() =>
		getSetting('memberListBadge')
	);
	const [profileBadge, setProfileBadgeState] = useState<boolean>(() => getSetting('profileBadge'));
	const [vcJoinToast, setVcJoinToastState] = useState<boolean>(() => getSetting('vcJoinToast'));
	const [socketInfo, setSocketInfo] = useState(() => getSocketStatus());

	const handlePlatformChange = (newPlatform: string) => {
		const pid = newPlatform as PlatformId;
		setPlatformState(pid);
		setSetting('platform', pid);

		// Force gateway identify immediately
		forceIdentify();
		setTimeout(() => setSocketInfo(getSocketStatus()), 500);

		const config = PLATFORMS[pid];
		if (config) {
			toasts?.show?.({
				title: 'Platform Updated',
				content: `Now spoofing as ${config.label} ${config.glyph}`,
			});
		}
	};

	const handleRestart = () => {
		restartDiscord();
	};

	const handleManualReconnect = () => {
		const success = forceIdentify();
		setTimeout(() => setSocketInfo(getSocketStatus()), 500);

		toasts?.show?.({
			title: success ? 'Gateway Reconnected' : 'Reconnecting...',
			content: success
				? 'Fresh IDENTIFY packet sent to Gateway!'
				: 'Waiting for Gateway socket connection...',
		});
	};

	const Page = ui?.Page ?? (({ children }: any) => children);
	const Section = ui?.Section;
	const RadioRow = ui?.RadioRow;
	const SwitchRow = ui?.SwitchRow;
	const ButtonRow = ui?.ButtonRow;
	const RestartRow = ui?.RestartRow;
	const Row = ui?.Row;

	const currentConfig = PLATFORMS[platform] ?? PLATFORMS.off;

	return (
		<Page>
			{/* Official Unbound restart banner */}
			{RestartRow && <RestartRow />}

			{/* Device Selector Radio Group */}
			{RadioRow && (
				<RadioRow
					title="SPOOFED CLIENT PLATFORM"
					description="Select which device or console you want to appear as across Discord and in Voice Channels (VC):"
					value={platform}
					options={SPOOF_OPTIONS}
					onChange={handlePlatformChange}
				/>
			)}

			{/* Apply Spoof & Restart Controls */}
			{Section && (
				<Section title="APPLY SPOOF & RESTART">
					{ButtonRow && (
						<ButtonRow
							label="Restart Discord Now"
							subLabel="Reloads the Discord client bundle to enforce the spoofed device handshake across all Voice Channels"
							variant="button"
							onPress={handleRestart}
						/>
					)}
					{ButtonRow && (
						<ButtonRow
							label="Force Gateway Re-Identify"
							subLabel="Reconnects Gateway WebSocket immediately without closing Discord"
							variant="button"
							onPress={handleManualReconnect}
						/>
					)}
				</Section>
			)}

			{/* Display & Voice Chat Options */}
			{Section && (
				<Section title="DISPLAY & VOICE CHAT OPTIONS">
					{SwitchRow && (
						<SwitchRow
							label="Voice Chat (VC) Badges"
							subLabel="Displays your spoofed platform badge beside your name when connected to Voice Channels"
							value={voiceSpoof}
							onValueChange={(val: boolean) => {
								setVoiceSpoofState(val);
								setSetting('voiceSpoof', val);
							}}
						/>
					)}
					{SwitchRow && (
						<SwitchRow
							label="Voice Channel Join Alert"
							subLabel="Shows a toast notification confirming your active spoofed platform upon entering VC"
							value={vcJoinToast}
							onValueChange={(val: boolean) => {
								setVcJoinToastState(val);
								setSetting('vcJoinToast', val);
							}}
						/>
					)}
					{SwitchRow && (
						<SwitchRow
							label="Member List Badge"
							subLabel="Show platform indicator badge next to your username in server member lists"
							value={memberListBadge}
							onValueChange={(val: boolean) => {
								setMemberListState(val);
								setSetting('memberListBadge', val);
							}}
						/>
					)}
					{SwitchRow && (
						<SwitchRow
							label="User Profile Badge"
							subLabel="Show platform badge in user profile cards"
							value={profileBadge}
							onValueChange={(val: boolean) => {
								setProfileBadgeState(val);
								setSetting('profileBadge', val);
							}}
						/>
					)}
				</Section>
			)}

			{/* Connection Diagnostics */}
			{Section && (
				<Section title="GATEWAY DIAGNOSTICS">
					{Row && (
						<Row
							label="Current Spoof"
							subLabel={`${currentConfig.label} (${currentConfig.glyph})`}
						/>
					)}
					{Row && (
						<Row
							label="Gateway Connection"
							subLabel={socketInfo.connected ? 'Connected' : 'Connecting / Standby'}
						/>
					)}
					{Row && (
						<Row
							label="Gateway Socket Hook"
							subLabel={socketInfo.patched ? 'Active (Patched Opcode 2)' : 'Inactive'}
						/>
					)}
					{Row && (
						<Row
							label="Session ID"
							subLabel={socketInfo.sessionId ?? 'None (Fresh session on next connect)'}
						/>
					)}
				</Section>
			)}

			{/* Plugin Author & Profile Navigation */}
			{Section && (
				<Section title="PLUGIN AUTHOR">
					{Row && (
						<Row
							label="teenagersdieyoung"
							subLabel="Discord ID: 349721444466294785 • Tap to open profile"
							arrow
							onPress={() => {
								try {
									const UserProfiles =
										(metro as any)?.api?.UserProfiles ??
										(metro as any)?.findByProps?.('showUserProfile');
									if (UserProfiles?.default) {
										UserProfiles.default({ userId: '349721444466294785' });
									} else if (UserProfiles?.showUserProfile) {
										UserProfiles.showUserProfile({ userId: '349721444466294785' });
									}
								} catch (err) {
									console.error('[DeviceSpoof] Failed to open author profile:', err);
								}
							}}
						/>
					)}
				</Section>
			)}
		</Page>
	);
}

export function SettingsPanel() {
	return (
		<SettingsErrorBoundary>
			<SettingsContent />
		</SettingsErrorBoundary>
	);
}
