import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { metro } from '@unbound-app/api';
import { SVG_ICONS, PLATFORMS, type PlatformId } from '../lib/constants';

interface PlatformBadgeProps {
	platformId: PlatformId;
	size?: number;
	color?: string;
	showPill?: boolean;
	showLabel?: boolean;
}

export function PlatformBadge({
	platformId,
	size = 18,
	color,
	showPill = false,
	showLabel = false,
}: PlatformBadgeProps) {
	const config = PLATFORMS[platformId] ?? PLATFORMS.off;
	const iconKey =
		platformId === 'meta'
			? 'vr'
			: platformId === 'xbox'
			? 'xbox'
			: platformId === 'ps5' || platformId === 'ps4'
			? 'playstation'
			: platformId === 'windows' || platformId === 'macos' || platformId === 'linux'
			? 'desktop'
			: platformId === 'web'
			? 'web'
			: platformId === 'android' || platformId === 'ios'
			? 'mobile'
			: 'embedded';

	const iconData = SVG_ICONS[iconKey] ?? SVG_ICONS.embedded;
	const badgeColor = color ?? config.color;

	// Use Discord's bundled SVG components
	const SVGModule = metro.common?.SVG ?? (metro.findByProps('Svg', 'Path') as any);
	const Svg = SVGModule?.Svg;
	const Path = SVGModule?.Path;

	const renderIcon = () => {
		if (Svg && Path && iconData?.path) {
			return (
				<Svg width={size} height={size} viewBox={iconData.viewBox} fill={badgeColor}>
					<Path d={iconData.path} fill={badgeColor} />
				</Svg>
			);
		}
		// Fallback to platform glyph
		return <Text style={{ fontSize: size - 2 }}>{config.glyph}</Text>;
	};

	if (showPill) {
		return (
			<View style={styles.pillContainer}>
				<View style={styles.pillBadge}>{renderIcon()}</View>
				{showLabel && <Text style={[styles.pillLabel, { color: badgeColor }]}>{config.label}</Text>}
			</View>
		);
	}

	return (
		<View style={styles.iconContainer}>
			{renderIcon()}
			{showLabel && <Text style={[styles.inlineLabel, { color: badgeColor }]}>{config.label}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	iconContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 3,
	},
	inlineLabel: {
		fontSize: 12,
		fontWeight: '600',
		marginLeft: 4,
	},
	pillContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	pillBadge: {
		backgroundColor: '#ffffff',
		borderRadius: 14,
		paddingHorizontal: 6,
		paddingVertical: 3,
		borderWidth: 1,
		borderColor: 'rgba(0, 0, 0, 0.08)',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.15,
		shadowRadius: 2,
		elevation: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	pillLabel: {
		fontSize: 12,
		fontWeight: '700',
		marginLeft: 6,
	},
});
