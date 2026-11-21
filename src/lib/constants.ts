export type PlatformId =
	| 'meta'
	| 'xbox'
	| 'ps5'
	| 'ps4'
	| 'windows'
	| 'macos'
	| 'linux'
	| 'web'
	| 'android'
	| 'ios'
	| 'off';

export interface PlatformConfig {
	id: PlatformId;
	label: string;
	description: string;
	category: 'VR' | 'Console' | 'Desktop' | 'Browser' | 'Mobile' | 'Default';
	glyph: string;
	color: string;
	client: 'vr' | 'embedded' | 'desktop' | 'web' | 'mobile' | 'default';
	consoleType?: 'xbox' | 'playstation';
	properties: {
		os: string;
		browser: string;
		device: string;
	} | null;
}

export const PLATFORMS: Record<PlatformId, PlatformConfig> = {
	meta: {
		id: 'meta',
		label: 'Meta Quest / VR',
		description: 'Shows the green VR headset badge in Voice Chat, profiles & member list',
		category: 'VR',
		glyph: '🥽',
		color: '#23a55a',
		client: 'vr',
		properties: {
			os: 'Android',
			browser: 'Discord VR',
			device: 'Meta Quest',
		},
	},
	xbox: {
		id: 'xbox',
		label: 'Xbox Console',
		description: 'Shows as Xbox console in Voice Chat & user status',
		category: 'Console',
		glyph: '🎮',
		color: '#107c10',
		client: 'embedded',
		consoleType: 'xbox',
		properties: {
			os: 'Xbox',
			browser: 'Discord Embedded',
			device: 'Xbox',
		},
	},
	ps5: {
		id: 'ps5',
		label: 'PlayStation 5',
		description: 'Shows as PS5 console in Voice Chat & user status',
		category: 'Console',
		glyph: '🎮',
		color: '#00439c',
		client: 'embedded',
		consoleType: 'playstation',
		properties: {
			os: 'PlayStation 5',
			browser: 'Discord Embedded',
			device: 'PlayStation 5',
		},
	},
	ps4: {
		id: 'ps4',
		label: 'PlayStation 4',
		description: 'Shows as PS4 console in Voice Chat & user status',
		category: 'Console',
		glyph: '🎮',
		color: '#00439c',
		client: 'embedded',
		consoleType: 'playstation',
		properties: {
			os: 'PlayStation 4',
			browser: 'Discord Embedded',
			device: 'PlayStation 4',
		},
	},
	windows: {
		id: 'windows',
		label: 'Windows PC',
		description: 'Shows as Desktop Discord client on Windows',
		category: 'Desktop',
		glyph: '🖥️',
		color: '#5865f2',
		client: 'desktop',
		properties: {
			os: 'Windows',
			browser: 'Discord Client',
			device: 'discord-client',
		},
	},
	macos: {
		id: 'macos',
		label: 'Apple macOS',
		description: 'Shows as Desktop Discord client on macOS',
		category: 'Desktop',
		glyph: '🍎',
		color: '#5865f2',
		client: 'desktop',
		properties: {
			os: 'Mac OS X',
			browser: 'Discord Client',
			device: 'discord-client',
		},
	},
	linux: {
		id: 'linux',
		label: 'Linux Desktop',
		description: 'Shows as Desktop Discord client on Linux',
		category: 'Desktop',
		glyph: '🐧',
		color: '#f0b232',
		client: 'desktop',
		properties: {
			os: 'Linux',
			browser: 'Discord Client',
			device: 'discord-client',
		},
	},
	web: {
		id: 'web',
		label: 'Web Browser (Chrome)',
		description: 'Shows as Web browser client',
		category: 'Browser',
		glyph: '🌐',
		color: '#23a55a',
		client: 'web',
		properties: {
			os: 'Windows',
			browser: 'Discord Web',
			device: 'Chrome',
		},
	},
	android: {
		id: 'android',
		label: 'Discord Android',
		description: 'Shows as official Android mobile client',
		category: 'Mobile',
		glyph: '🤖',
		color: '#3ddc84',
		client: 'mobile',
		properties: {
			os: 'Android',
			browser: 'Discord Android',
			device: 'Discord Android',
		},
	},
	ios: {
		id: 'ios',
		label: 'Discord iOS (iPhone)',
		description: 'Shows as official iOS mobile client',
		category: 'Mobile',
		glyph: '📱',
		color: '#23a55a',
		client: 'mobile',
		properties: {
			os: 'iOS',
			browser: 'Discord iOS',
			device: 'iPhone',
		},
	},
	off: {
		id: 'off',
		label: 'Disabled / Real Device',
		description: 'Uses your authentic un-spoofed client properties',
		category: 'Default',
		glyph: '⚪',
		color: '#80848e',
		client: 'default',
		properties: null,
	},
};

export const SVG_ICONS: Record<string, { path: string; viewBox: string; size: number }> = {
	// Green VR Headset icon badge matching Discord's native Quest badge
	vr: {
		path: 'M8.46 8.64a1 1 0 0 1 1 1c0 .44-.3.8-.72.92l-.11.07c-.08.06-.2.19-.2.41a.99.99 0 0 1-.98.86h-.06a1 1 0 0 1-.94-1.05l.02-.32c.05-1.06.92-1.9 1.99-1.9ZM15.55 5a5.5 5.5 0 0 1 5.15 3.67h.3a2 2 0 0 1 2 2v3.18a2 2 0 0 1-2 1.99h-.2A4.54 4.54 0 0 1 16.55 19a4.45 4.45 0 0 1-3.6-1.83 1.2 1.2 0 0 0-1.9 0 4.44 4.44 0 0 1-3.9 1.82 4.54 4.54 0 0 1-3.94-3.15H3a2 2 0 0 1-2-2v-3.18c0-1.1.9-1.99 2-1.99h.3A5.5 5.5 0 0 1 8.46 5h7.09Zm-7.1 2C6.6 7 5.06 8.5 4.97 10.41l-.02.66v3.18c0 1.43 1.05 2.66 2.34 2.74.85.06 1.63-.32 2.14-1.01a3.2 3.2 0 0 1 2.57-1.3c1 0 1.97.48 2.57 1.3.5.69 1.3 1.08 2.14 1.01 1.3-.08 2.34-1.31 2.34-2.74l-.02-3.84a3.54 3.54 0 0 0-3.49-3.43H8.45Z',
		viewBox: '0 4 24 16',
		size: 20,
	},
	// Xbox Console icon
	xbox: {
		path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.04 17.52c-2.31-.22-4.2-1.39-5.45-3.13 1.77-.38 3.86-1.55 5.09-3.26.16.59.35 1.18.57 1.75-.07 1.55-.13 3.12-.21 4.64zm2.08 0c-.08-1.52-.14-3.09-.21-4.64.22-.57.41-1.16.57-1.75 1.23 1.71 3.32 2.88 5.09 3.26-1.25 1.74-3.14 2.91-5.45 3.13zm4.27-4.14c-1.51-.44-3.15-1.55-4.16-3.02 1.4-2.14 3.35-4.43 4.96-5.87 1.14 1.34 1.89 3.01 2.05 4.86-.53 1.6-1.58 2.98-2.85 4.03zm-10.62 0c-1.27-1.05-2.32-2.43-2.85-4.03.16-1.85.91-3.52 2.05-4.86 1.61 1.44 3.56 3.73 4.96 5.87-1.01 1.47-2.65 2.58-4.16 3.02z',
		viewBox: '0 0 24 24',
		size: 20,
	},
	// PlayStation icon
	playstation: {
		path: 'M23.15 15.36c-.46-.86-1.56-1.32-3.1-1.32-1.36 0-2.87.39-4.25 1.12l-.08.04v-3.79c1.6-.74 3.31-1.14 4.86-1.14 2.37 0 4.19.86 4.94 2.29.61 1.17.43 2.52-.47 3.5-.04.04-.08.08-.12.11l-1.78-.81zm-9.52 3.12c-.93.36-1.87.55-2.8.55-1.57 0-2.73-.52-3.23-1.46-.43-.8-.21-1.75.58-2.47.69-.64 1.74-1.09 3.03-1.31l2.42-.42v5.11zm10.37-3.04c-.38.41-.95.73-1.68.96l-1.39-.63c1.07-.36 1.83-.81 2.23-1.31.39-.49.44-.99.16-1.52-.35-.67-1.36-1.12-2.78-1.25l-.01-.01v-1.12c2.03.17 3.65.86 4.35 1.87.64.92.51 2.02-.88 3.01zm-13.88-1.8c-1.01.18-1.84.53-2.38 1.03-.45.41-.57.88-.34 1.31.29.54 1.07.87 2.21.94l.51.03v-3.31zm-2.09-8.49c-.27 0-.54.02-.81.06-2.58.41-4.14 2.15-4.17 4.67-.03 2.19 1.17 3.93 3.2 4.66l1.78.64v-1.85l-1.28-.46c-1.19-.43-1.82-1.34-1.8-2.61.02-1.34.87-2.33 2.27-2.64.39-.09.78-.13 1.16-.13 1.19 0 2.27.35 3.12 1.02l.74.58 1.34-.99-.86-.67c-1.24-.97-2.82-1.48-4.59-1.48z',
		viewBox: '0 0 24 24',
		size: 20,
	},
	// Desktop monitor icon
	desktop: {
		path: 'M4 2.5c-1.103 0-2 .897-2 2v11c0 1.104.897 2 2 2h7v2H7v2h10v-2h-4v-2h7c1.103 0 2-.896 2-2v-11c0-1.103-.897-2-2-2H4Zm16 2v9H4v-9h16Z',
		viewBox: '0 0 24 24',
		size: 20,
	},
	// Web browser icon
	web: {
		path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z',
		viewBox: '0 0 24 24',
		size: 20,
	},
	// Mobile phone icon
	mobile: {
		path: 'M 187 0 L 813 0 C 916.277 0 1000 83.723 1000 187 L 1000 1313 C 1000 1416.277 916.277 1500 813 1500 L 187 1500 C 83.723 1500 0 1416.277 0 1313 L 0 187 C 0 83.723 83.723 0 187 0 Z M 125 1000 L 875 1000 L 875 250 L 125 250 Z M 500 1125 C 430.964 1125 375 1180.964 375 1250 C 375 1319.036 430.964 1375 500 1375 C 569.036 1375 625 1319.036 625 1250 C 625 1180.964 569.036 1125 500 1125 Z',
		viewBox: '0 0 1000 1500',
		size: 18,
	},
	// General console controller
	embedded: {
		path: 'M3.06 20.4q-1.53 0-2.37-1.065T.06 16.74l1.26-9q.27-1.8 1.605-2.97T6.06 3.6h11.88q1.8 0 3.135 1.17t1.605 2.97l1.26 9q.21 1.53-.63 2.595T20.94 20.4q-.63 0-1.17-.225T18.78 19.5l-2.7-2.7H7.92l-2.7 2.7q-.45.45-.99.675t-1.17.225Zm14.94-7.2q.51 0 .855-.345T19.2 12q0-.51-.345-.855T18 10.8q-.51 0-.855.345T16.8 12q0 .51.345 .855T18 13.2Zm-2.4-3.6q.51 0 .855-.345T16.8 8.4q0-.51-.345-.855T15.6 7.2q-.51 0-.855.345T14.4 8.4q0 .51.345 .855T15.6 9.6ZM6.9 13.2h1.8v-2.1h2.1v-1.8h-2.1v-2.1h-1.8v2.1h-2.1v1.8h2.1v2.1Z',
		viewBox: '0 0 24 24',
		size: 20,
	},
};
