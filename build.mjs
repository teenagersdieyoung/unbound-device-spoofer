import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('dist');
if (!fs.existsSync(outDir)) {
	fs.mkdirSync(outDir, { recursive: true });
}

const shimsPlugin = {
	name: 'unbound-shims',
	setup(build) {
		build.onResolve({ filter: /^@unbound-app\/api/ }, (args) => ({
			path: args.path,
			namespace: 'unbound-shim',
		}));
		build.onLoad({ filter: /.*/, namespace: 'unbound-shim' }, () => ({
			contents: `
				const getApi = () => {
					if (typeof unbound !== 'undefined' && unbound) return unbound;
					if (typeof globalThis !== 'undefined' && globalThis.unbound) return globalThis.unbound;
					if (typeof window !== 'undefined' && window.unbound) return window.unbound;
					return {};
				};
				export const metro = new Proxy({}, { get: (_, prop) => getApi().metro?.[prop] });
				export const patcher = new Proxy({}, { get: (_, prop) => getApi().patcher?.[prop] });
				export const storage = new Proxy({}, { get: (_, prop) => getApi().storage?.[prop] });
				export const toasts = new Proxy({}, { get: (_, prop) => getApi().toasts?.[prop] });
				export const flux = new Proxy({}, { get: (_, prop) => getApi().flux?.[prop] });
				export const ui = new Proxy({}, { get: (_, prop) => getApi().ui?.[prop] });
				export const logger = new Proxy({}, { get: (_, prop) => getApi().logger?.[prop] ?? console[prop] });
				export default new Proxy({}, { get: (_, prop) => getApi()[prop] });
			`,
		}));

		build.onResolve({ filter: /^react$/ }, (args) => ({
			path: args.path,
			namespace: 'react-shim',
		}));
		build.onLoad({ filter: /.*/, namespace: 'react-shim' }, () => ({
			contents: `
				const getR = () => {
					if (typeof React !== 'undefined' && React) return React;
					if (typeof globalThis !== 'undefined' && globalThis.React) return globalThis.React;
					if (typeof window !== 'undefined' && window.React) return window.React;
					return {};
				};
				export const useState = (...args) => getR().useState?.(...args);
				export const useEffect = (...args) => getR().useEffect?.(...args);
				export const useMemo = (...args) => getR().useMemo?.(...args);
				export const useCallback = (...args) => getR().useCallback?.(...args);
				export const useRef = (...args) => getR().useRef?.(...args);
				export const cloneElement = (...args) => getR().cloneElement?.(...args);
				export const createElement = (...args) => getR().createElement?.(...args);
				export const Component = getR().Component || class {};
				export default new Proxy({}, { get: (_, prop) => getR()[prop] });
			`,
		}));

		build.onResolve({ filter: /^react-native$/ }, (args) => ({
			path: args.path,
			namespace: 'rn-shim',
		}));
		build.onLoad({ filter: /.*/, namespace: 'rn-shim' }, () => ({
			contents: `
				const getRN = () => {
					if (typeof ReactNative !== 'undefined' && ReactNative) return ReactNative;
					if (typeof globalThis !== 'undefined' && globalThis.ReactNative) return globalThis.ReactNative;
					if (typeof window !== 'undefined' && window.ReactNative) return window.ReactNative;
					const u = typeof unbound !== 'undefined' ? unbound : (typeof window !== 'undefined' ? window.unbound : null);
					if (u && u.metro) {
						return u.metro.common?.ReactNative || u.metro.findByProps?.('StyleSheet') || {};
					}
					return {};
				};
				const getReact = () => {
					if (typeof React !== 'undefined' && React) return React;
					if (typeof globalThis !== 'undefined' && globalThis.React) return globalThis.React;
					if (typeof window !== 'undefined' && window.React) return window.React;
					return null;
				};
				export const View = (props) => {
					const rn = getRN();
					const r = getReact();
					const Comp = rn.View;
					return Comp && r ? r.createElement(Comp, props) : (props?.children ?? null);
				};
				export const Text = (props) => {
					const rn = getRN();
					const r = getReact();
					const Comp = rn.Text;
					return Comp && r ? r.createElement(Comp, props) : (props?.children ?? null);
				};
				export const Pressable = (props) => {
					const rn = getRN();
					const r = getReact();
					const Comp = rn.Pressable;
					return Comp && r ? r.createElement(Comp, props) : (props?.children ?? null);
				};
				export const ScrollView = (props) => {
					const rn = getRN();
					const r = getReact();
					const Comp = rn.ScrollView;
					return Comp && r ? r.createElement(Comp, props) : (props?.children ?? null);
				};
				export const StyleSheet = {
					create: (s) => s,
					flatten: (s) => (Array.isArray(s) ? Object.assign({}, ...s.filter(Boolean)) : s)
				};
				export default new Proxy({}, { get: (_, prop) => getRN()[prop] });
			`,
		}));
	},
};

console.log('[Build] Compiling Unbound Device Spoofer plugin...');

try {
	const result = await esbuild.build({
		entryPoints: ['src/index.tsx'],
		bundle: true,
		format: 'iife',
		globalName: '__DeviceSpoofer',
		plugins: [shimsPlugin],
		write: false,
		target: 'es2022',
		jsx: 'transform',
		minify: false,
		sourcemap: false,
	});

	let rawJs = result.outputFiles[0].text;

	// Strip 'var __DeviceSpoofer = ' prefix and trailing semicolon
	rawJs = rawJs.replace(/^\s*var\s+__DeviceSpoofer\s*=\s*/, '').replace(/;\s*$/, '');

	// Wrap in Unbound LazyPlugin structure
	const finalBundle = `({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=${rawJs};return this.__plugin;}})`;

	// Write index.js to ROOT (so raw.githubusercontent.com/.../index.js works)
	fs.writeFileSync('index.js', finalBundle, 'utf-8');

	// Also write to dist/index.js
	fs.writeFileSync(path.join(outDir, 'index.js'), finalBundle, 'utf-8');

	// Copy manifest to dist/manifest.json
	fs.copyFileSync('manifest.json', path.join(outDir, 'manifest.json'));

	console.log('[Build] Successfully built:');
	console.log(' - ./index.js (Root entry for raw GitHub URL)');
	console.log(' - ./dist/index.js');
	console.log(' - ./dist/manifest.json');
} catch (e) {
	console.error('[Build] Build failed:', e);
	process.exit(1);
}
