import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PLATFORMS, type PlatformId } from '../lib/constants';
import { PlatformBadge } from './PlatformBadge';

interface DevicePreviewProps {
	platformId: PlatformId;
}

export function DevicePreview({ platformId }: DevicePreviewProps) {
	const config = PLATFORMS[platformId] ?? PLATFORMS.off;
	const isEnabled = platformId !== 'off';

	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>ACTIVE PREVIEW</Text>
				<View style={[styles.statusTag, isEnabled ? styles.statusActive : styles.statusDisabled]}>
					<Text style={styles.statusTagText}>{isEnabled ? 'SPOOF ACTIVE' : 'OFF'}</Text>
				</View>
			</View>

			<View style={styles.previewBox}>
				{/* Simulated avatar circle */}
				<View style={styles.avatarMock}>
					<Text style={styles.avatarLetter}>U</Text>

					{/* Badge overlay matching the user's uploaded VR headset screenshot */}
					<View style={styles.badgeOverlay}>
						<PlatformBadge platformId={platformId} size={16} showPill={true} />
					</View>
				</View>

				<View style={styles.infoCol}>
					{/* Online status indicator */}
					<View style={styles.onlineBadge}>
						<View style={[styles.onlineDot, { backgroundColor: config.color }]} />
						<Text style={styles.onlineText}>Online</Text>
					</View>

					<Text style={styles.deviceName}>{config.label}</Text>
					<Text style={styles.deviceCategory}>{config.category} • Voice Chat & Gateway</Text>
				</View>
			</View>

			{config.properties && (
				<View style={styles.payloadDetails}>
					<Text style={styles.payloadText}>
						<Text style={styles.payloadKey}>Client: </Text>
						{config.properties.browser}
					</Text>
					<Text style={styles.payloadText}>
						<Text style={styles.payloadKey}>OS: </Text>
						{config.properties.os}
					</Text>
					<Text style={styles.payloadText}>
						<Text style={styles.payloadKey}>Device: </Text>
						{config.properties.device}
					</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#2b2d31',
		borderRadius: 12,
		padding: 14,
		marginVertical: 10,
		borderWidth: 1,
		borderColor: '#383a40',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	headerTitle: {
		fontSize: 11,
		fontWeight: '800',
		color: '#949ba4',
		letterSpacing: 0.5,
	},
	statusTag: {
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 6,
	},
	statusActive: {
		backgroundColor: 'rgba(35, 165, 90, 0.2)',
	},
	statusDisabled: {
		backgroundColor: 'rgba(128, 132, 142, 0.2)',
	},
	statusTagText: {
		fontSize: 10,
		fontWeight: '800',
		color: '#23a55a',
	},
	previewBox: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
	},
	avatarMock: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: '#5865f2',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	avatarLetter: {
		color: '#ffffff',
		fontSize: 20,
		fontWeight: '700',
	},
	badgeOverlay: {
		position: 'absolute',
		bottom: -6,
		right: -8,
	},
	infoCol: {
		marginLeft: 18,
		flex: 1,
	},
	onlineBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#1e1f22',
		alignSelf: 'flex-start',
		paddingHorizontal: 7,
		paddingVertical: 2,
		borderRadius: 10,
		marginBottom: 4,
	},
	onlineDot: {
		width: 7,
		height: 7,
		borderRadius: 4,
		marginRight: 5,
	},
	onlineText: {
		fontSize: 11,
		fontWeight: '700',
		color: '#dbdee1',
	},
	deviceName: {
		fontSize: 15,
		fontWeight: '700',
		color: '#f2f3f5',
	},
	deviceCategory: {
		fontSize: 11,
		color: '#949ba4',
		marginTop: 1,
	},
	payloadDetails: {
		marginTop: 10,
		paddingTop: 8,
		borderTopWidth: 1,
		borderTopColor: '#383a40',
	},
	payloadText: {
		fontSize: 11,
		color: '#b5bac1',
		fontFamily: 'monospace',
		marginVertical: 1,
	},
	payloadKey: {
		color: '#949ba4',
		fontWeight: '600',
	},
});
