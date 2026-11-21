import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('dist');
if (!fs.existsSync(outDir)) {
	fs.mkdirSync(outDir, { recursive: true });
}

// Copy manifest to dist
fs.copyFileSync('manifest.json', path.join(outDir, 'manifest.json'));

console.log('[Build] Building Unbound Device Spoofer plugin...');

try {
	await esbuild.build({
		entryPoints: ['src/index.tsx'],
		bundle: true,
		format: 'esm',
		target: 'es2022',
		outfile: 'dist/index.js',
		external: [
			'@unbound-app/*',
			'@unbound-app/api',
			'@unbound-app/settings',
			'@unbound-app/i18n',
			'react',
			'react-native',
		],
		loader: {
			'.ts': 'ts',
			'.tsx': 'tsx',
			'.js': 'js',
			'.jsx': 'jsx',
		},
		jsx: 'transform',
		minify: false,
		sourcemap: false,
	});

	console.log('[Build] Successfully built dist/index.js and dist/manifest.json!');
} catch (e) {
	console.error('[Build] Build failed:', e);
	process.exit(1);
}
