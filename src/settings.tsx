import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { ui, toasts } from '@unbound-app/api';
import { PLATFORMS, type PlatformId, type PlatformConfig } from './lib/constants';
import { getSetting, setSetting } from './lib/storage';
import { forceIdentify, getSocketStatus } from './lib/gateway';
import { DevicePreview } from './components/DevicePreview';
import { PlatformBadge } from './components/PlatformBadge';

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
		forceIdentify();
		setTimeout(() => setSocketInfo(getSocketStatus()), 600);

		const config = PLATFORMS[newPlatform];
		toasts.show({
			title: 'Platform Updated',
			content: `Now spoofing as ${config.label} ${config.glyph}`,
		});
	};

	const handleManualReconnect = () => {
		const success = forceIdentify();
		setTimeout(() => setSocketInfo(getSocketStatus()), 600);

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

	const platformKeys: PlatformId[] = [
		'meta',
		'xbox',
		'ps5',
		'ps4',
		'windows',
		'macos',
		'linux',
		'web',
		'android',
		'ios',
		'off',
	];

	const PageComponent = ui?.Page ?? ScrollView;

	return (
		<PageComponent style={styles.container}>
			{/* Live Active Preview Card */}
			<View style={styles.section}>
				<Text style={styles.sectionHeader}>ACTIVE SPOOF PREVIEW</Text>
				<DevicePreview platformId={platform} />
				{ui?.ButtonRow ? (
					<ui.ButtonRow
						label="Force Gateway Re-Identify"
						subLabel="Triggers immediate handshake so Voice Channels and profiles update instantly"
						variant="button"
						onPress={handleManualReconnect}
					/>
				) : (
					<Pressable style={styles.reconnectButton} onPress={handleManualReconnect}>
						<Text style={styles.reconnectButtonText}>⚡ Force Gateway Re-Identify</Text>
					</Pressable>
				)}
			</View>

			{/* Visual Platform Selector Cards */}
			<View style={styles.section}>
				<Text style={styles.sectionHeader}>SELECT SPOOFED PLATFORM</Text>
				<Text style={styles.sectionSubtitle}>
					Tap any device to switch your Discord presence and Voice Chat badge:
				</Text>

				<View style={styles.cardsGrid}>
					{platformKeys.map((key) => {
						const item = PLATFORMS[key];
						const isSelected = platform === key;

						return (
							<Pressable
								key={key}
								style={[styles.cardItem, isSelected && styles.cardItemSelected]}
								onPress={() => handlePlatformChange(key)}
							>
								<View style={styles.cardHeader}>
									<View style={styles.cardIconWrap}>
										<PlatformBadge platformId={key} size={20} showPill={true} />
									</View>
									<View style={styles.cardTextCol}>
										<Text
											style={[styles.cardTitle, isSelected && { color: item.color || '#23a55a' }]}
										>
											{item.label}
										</Text>
										<Text style={styles.cardCategory}>{item.category}</Text>
									</View>
									<View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
										{isSelected && <View style={styles.radioDot} />}
									</View>
								</View>
								<Text style={styles.cardDesc}>{item.description}</Text>
							</Pressable>
						);
					})}
				</View>
			</View>

			{/* Display & Voice Chat Options */}
			<View style={styles.section}>
				<Text style={styles.sectionHeader}>DISPLAY & VOICE CHAT OPTIONS</Text>

				{ui?.SwitchRow ? (
					<>
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
					</>
				) : (
					<Text style={styles.fallbackText}>Switches rendered via Discord settings kit.</Text>
				)}
			</View>

			{/* Connection Diagnostics */}
			<View style={styles.section}>
				<Text style={styles.sectionHeader}>GATEWAY STATUS</Text>
				<View style={styles.diagnosticsBox}>
					<View style={styles.diagRow}>
						<Text style={styles.diagLabel}>Connection:</Text>
						<Text
							style={[styles.diagValue, { color: socketInfo.connected ? '#23a55a' : '#f0b232' }]}
						>
							{socketInfo.connected ? '● Connected' : '○ Connecting / Standby'}
						</Text>
					</View>
					<View style={styles.diagRow}>
						<Text style={styles.diagLabel}>Session ID:</Text>
						<Text style={styles.diagValue}>{socketInfo.sessionId ?? 'None'}</Text>
					</View>
					<View style={styles.diagRow}>
						<Text style={styles.diagLabel}>Socket Hook:</Text>
						<Text style={[styles.diagValue, { color: socketInfo.patched ? '#23a55a' : '#f23f43' }]}>
							{socketInfo.patched ? 'Active (Patched)' : 'Inactive'}
						</Text>
					</View>
					<View style={styles.diagRow}>
						<Text style={styles.diagLabel}>Spoofed As:</Text>
						<Text style={styles.diagValue}>{socketInfo.currentPlatform}</Text>
					</View>
				</View>
			</View>
		</PageComponent>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1e1f22',
		paddingHorizontal: 12,
		paddingVertical: 14,
	},
	section: {
		marginBottom: 20,
	},
	sectionHeader: {
		fontSize: 12,
		fontWeight: '800',
		color: '#949ba4',
		letterSpacing: 0.5,
		marginBottom: 6,
		textTransform: 'uppercase',
	},
	sectionSubtitle: {
		fontSize: 13,
		color: '#b5bac1',
		marginBottom: 10,
	},
	reconnectButton: {
		backgroundColor: '#5865f2',
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 8,
	},
	reconnectButtonText: {
		color: '#ffffff',
		fontSize: 14,
		fontWeight: '700',
	},
	cardsGrid: {
		gap: 8,
	},
	cardItem: {
		backgroundColor: '#2b2d31',
		borderRadius: 10,
		padding: 12,
		borderWidth: 1.5,
		borderColor: '#35373c',
	},
	cardItemSelected: {
		borderColor: '#5865f2',
		backgroundColor: '#313338',
	},
	cardHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	cardIconWrap: {
		marginRight: 10,
	},
	cardTextCol: {
		flex: 1,
	},
	cardTitle: {
		fontSize: 14,
		fontWeight: '700',
		color: '#f2f3f5',
	},
	cardCategory: {
		fontSize: 11,
		color: '#949ba4',
		marginTop: 1,
	},
	cardDesc: {
		fontSize: 12,
		color: '#949ba4',
		marginTop: 6,
		lineHeight: 16,
	},
	radioCircle: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: '#80848e',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 8,
	},
	radioCircleActive: {
		borderColor: '#5865f2',
	},
	radioDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: '#5865f2',
	},
	fallbackText: {
		color: '#949ba4',
		fontSize: 13,
	},
	diagnosticsBox: {
		backgroundColor: '#2b2d31',
		borderRadius: 8,
		padding: 12,
		borderWidth: 1,
		borderColor: '#35373c',
	},
	diagRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 4,
	},
	diagLabel: {
		fontSize: 12,
		color: '#949ba4',
		fontWeight: '600',
	},
	diagValue: {
		fontSize: 12,
		color: '#dbdee1',
		fontFamily: 'monospace',
		fontWeight: '600',
	},
});
