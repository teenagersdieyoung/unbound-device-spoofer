({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.tsx
  var index_exports = {};
  __export(index_exports, {
    SettingsPanel: () => SettingsPanel,
    start: () => start,
    stop: () => stop
  });

  // unbound-shim:@unbound-app/api
  var getApi = () => {
    if (typeof unbound !== "undefined" && unbound) return unbound;
    if (typeof globalThis !== "undefined" && globalThis.unbound) return globalThis.unbound;
    if (typeof window !== "undefined" && window.unbound) return window.unbound;
    return {};
  };
  var metro = new Proxy({}, { get: (_, prop) => getApi().metro?.[prop] });
  var patcher = new Proxy({}, { get: (_, prop) => getApi().patcher?.[prop] });
  var storage = new Proxy({}, { get: (_, prop) => getApi().storage?.[prop] });
  var toasts = new Proxy({}, { get: (_, prop) => getApi().toasts?.[prop] });
  var flux = new Proxy({}, { get: (_, prop) => getApi().flux?.[prop] });
  var ui = new Proxy({}, { get: (_, prop) => getApi().ui?.[prop] });
  var logger = new Proxy({}, { get: (_, prop) => getApi().logger?.[prop] ?? console[prop] });
  var api_default = new Proxy({}, { get: (_, prop) => getApi()[prop] });

  // src/lib/constants.ts
  var PLATFORMS = {
    meta: {
      id: "meta",
      label: "Meta Quest / VR",
      description: "Shows the green VR headset badge in Voice Chat, profiles & member list",
      category: "VR",
      glyph: "\u{1F97D}",
      color: "#23a55a",
      client: "vr",
      properties: {
        os: "Android",
        browser: "Discord VR",
        device: "Meta Quest"
      }
    },
    xbox: {
      id: "xbox",
      label: "Xbox Console",
      description: "Shows as Xbox console in Voice Chat & user status",
      category: "Console",
      glyph: "\u{1F3AE}",
      color: "#107c10",
      client: "embedded",
      consoleType: "xbox",
      properties: {
        os: "Xbox",
        browser: "Discord Embedded",
        device: "Xbox"
      }
    },
    ps5: {
      id: "ps5",
      label: "PlayStation 5",
      description: "Shows as PS5 console in Voice Chat & user status",
      category: "Console",
      glyph: "\u{1F3AE}",
      color: "#00439c",
      client: "embedded",
      consoleType: "playstation",
      properties: {
        os: "PlayStation 5",
        browser: "Discord Embedded",
        device: "PlayStation 5"
      }
    },
    ps4: {
      id: "ps4",
      label: "PlayStation 4",
      description: "Shows as PS4 console in Voice Chat & user status",
      category: "Console",
      glyph: "\u{1F3AE}",
      color: "#00439c",
      client: "embedded",
      consoleType: "playstation",
      properties: {
        os: "PlayStation 4",
        browser: "Discord Embedded",
        device: "PlayStation 4"
      }
    },
    windows: {
      id: "windows",
      label: "Windows PC",
      description: "Shows as Desktop Discord client on Windows",
      category: "Desktop",
      glyph: "\u{1F5A5}\uFE0F",
      color: "#5865f2",
      client: "desktop",
      properties: {
        os: "Windows",
        browser: "Discord Client",
        device: "discord-client"
      }
    },
    macos: {
      id: "macos",
      label: "Apple macOS",
      description: "Shows as Desktop Discord client on macOS",
      category: "Desktop",
      glyph: "\u{1F34E}",
      color: "#5865f2",
      client: "desktop",
      properties: {
        os: "Mac OS X",
        browser: "Discord Client",
        device: "discord-client"
      }
    },
    linux: {
      id: "linux",
      label: "Linux Desktop",
      description: "Shows as Desktop Discord client on Linux",
      category: "Desktop",
      glyph: "\u{1F427}",
      color: "#f0b232",
      client: "desktop",
      properties: {
        os: "Linux",
        browser: "Discord Client",
        device: "discord-client"
      }
    },
    web: {
      id: "web",
      label: "Web Browser (Chrome)",
      description: "Shows as Web browser client",
      category: "Browser",
      glyph: "\u{1F310}",
      color: "#23a55a",
      client: "web",
      properties: {
        os: "Windows",
        browser: "Discord Web",
        device: "Chrome"
      }
    },
    android: {
      id: "android",
      label: "Discord Android",
      description: "Shows as official Android mobile client",
      category: "Mobile",
      glyph: "\u{1F916}",
      color: "#3ddc84",
      client: "mobile",
      properties: {
        os: "Android",
        browser: "Discord Android",
        device: "Discord Android"
      }
    },
    ios: {
      id: "ios",
      label: "Discord iOS (iPhone)",
      description: "Shows as official iOS mobile client",
      category: "Mobile",
      glyph: "\u{1F4F1}",
      color: "#23a55a",
      client: "mobile",
      properties: {
        os: "iOS",
        browser: "Discord iOS",
        device: "iPhone"
      }
    },
    off: {
      id: "off",
      label: "Disabled / Real Device",
      description: "Uses your authentic un-spoofed client properties",
      category: "Default",
      glyph: "\u26AA",
      color: "#80848e",
      client: "default",
      properties: null
    }
  };
  var SVG_ICONS = {
    // Green VR Headset icon badge matching Discord's native Quest badge
    vr: {
      path: "M8.46 8.64a1 1 0 0 1 1 1c0 .44-.3.8-.72.92l-.11.07c-.08.06-.2.19-.2.41a.99.99 0 0 1-.98.86h-.06a1 1 0 0 1-.94-1.05l.02-.32c.05-1.06.92-1.9 1.99-1.9ZM15.55 5a5.5 5.5 0 0 1 5.15 3.67h.3a2 2 0 0 1 2 2v3.18a2 2 0 0 1-2 1.99h-.2A4.54 4.54 0 0 1 16.55 19a4.45 4.45 0 0 1-3.6-1.83 1.2 1.2 0 0 0-1.9 0 4.44 4.44 0 0 1-3.9 1.82 4.54 4.54 0 0 1-3.94-3.15H3a2 2 0 0 1-2-2v-3.18c0-1.1.9-1.99 2-1.99h.3A5.5 5.5 0 0 1 8.46 5h7.09Zm-7.1 2C6.6 7 5.06 8.5 4.97 10.41l-.02.66v3.18c0 1.43 1.05 2.66 2.34 2.74.85.06 1.63-.32 2.14-1.01a3.2 3.2 0 0 1 2.57-1.3c1 0 1.97.48 2.57 1.3.5.69 1.3 1.08 2.14 1.01 1.3-.08 2.34-1.31 2.34-2.74l-.02-3.84a3.54 3.54 0 0 0-3.49-3.43H8.45Z",
      viewBox: "0 4 24 16",
      size: 20
    },
    // Xbox Console icon
    xbox: {
      path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.04 17.52c-2.31-.22-4.2-1.39-5.45-3.13 1.77-.38 3.86-1.55 5.09-3.26.16.59.35 1.18.57 1.75-.07 1.55-.13 3.12-.21 4.64zm2.08 0c-.08-1.52-.14-3.09-.21-4.64.22-.57.41-1.16.57-1.75 1.23 1.71 3.32 2.88 5.09 3.26-1.25 1.74-3.14 2.91-5.45 3.13zm4.27-4.14c-1.51-.44-3.15-1.55-4.16-3.02 1.4-2.14 3.35-4.43 4.96-5.87 1.14 1.34 1.89 3.01 2.05 4.86-.53 1.6-1.58 2.98-2.85 4.03zm-10.62 0c-1.27-1.05-2.32-2.43-2.85-4.03.16-1.85.91-3.52 2.05-4.86 1.61 1.44 3.56 3.73 4.96 5.87-1.01 1.47-2.65 2.58-4.16 3.02z",
      viewBox: "0 0 24 24",
      size: 20
    },
    // PlayStation icon
    playstation: {
      path: "M23.15 15.36c-.46-.86-1.56-1.32-3.1-1.32-1.36 0-2.87.39-4.25 1.12l-.08.04v-3.79c1.6-.74 3.31-1.14 4.86-1.14 2.37 0 4.19.86 4.94 2.29.61 1.17.43 2.52-.47 3.5-.04.04-.08.08-.12.11l-1.78-.81zm-9.52 3.12c-.93.36-1.87.55-2.8.55-1.57 0-2.73-.52-3.23-1.46-.43-.8-.21-1.75.58-2.47.69-.64 1.74-1.09 3.03-1.31l2.42-.42v5.11zm10.37-3.04c-.38.41-.95.73-1.68.96l-1.39-.63c1.07-.36 1.83-.81 2.23-1.31.39-.49.44-.99.16-1.52-.35-.67-1.36-1.12-2.78-1.25l-.01-.01v-1.12c2.03.17 3.65.86 4.35 1.87.64.92.51 2.02-.88 3.01zm-13.88-1.8c-1.01.18-1.84.53-2.38 1.03-.45.41-.57.88-.34 1.31.29.54 1.07.87 2.21.94l.51.03v-3.31zm-2.09-8.49c-.27 0-.54.02-.81.06-2.58.41-4.14 2.15-4.17 4.67-.03 2.19 1.17 3.93 3.2 4.66l1.78.64v-1.85l-1.28-.46c-1.19-.43-1.82-1.34-1.8-2.61.02-1.34.87-2.33 2.27-2.64.39-.09.78-.13 1.16-.13 1.19 0 2.27.35 3.12 1.02l.74.58 1.34-.99-.86-.67c-1.24-.97-2.82-1.48-4.59-1.48z",
      viewBox: "0 0 24 24",
      size: 20
    },
    // Desktop monitor icon
    desktop: {
      path: "M4 2.5c-1.103 0-2 .897-2 2v11c0 1.104.897 2 2 2h7v2H7v2h10v-2h-4v-2h7c1.103 0 2-.896 2-2v-11c0-1.103-.897-2-2-2H4Zm16 2v9H4v-9h16Z",
      viewBox: "0 0 24 24",
      size: 20
    },
    // Web browser icon
    web: {
      path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z",
      viewBox: "0 0 24 24",
      size: 20
    },
    // Mobile phone icon
    mobile: {
      path: "M 187 0 L 813 0 C 916.277 0 1000 83.723 1000 187 L 1000 1313 C 1000 1416.277 916.277 1500 813 1500 L 187 1500 C 83.723 1500 0 1416.277 0 1313 L 0 187 C 0 83.723 83.723 0 187 0 Z M 125 1000 L 875 1000 L 875 250 L 125 250 Z M 500 1125 C 430.964 1125 375 1180.964 375 1250 C 375 1319.036 430.964 1375 500 1375 C 569.036 1375 625 1319.036 625 1250 C 625 1180.964 569.036 1125 500 1125 Z",
      viewBox: "0 0 1000 1500",
      size: 18
    },
    // General console controller
    embedded: {
      path: "M3.06 20.4q-1.53 0-2.37-1.065T.06 16.74l1.26-9q.27-1.8 1.605-2.97T6.06 3.6h11.88q1.8 0 3.135 1.17t1.605 2.97l1.26 9q.21 1.53-.63 2.595T20.94 20.4q-.63 0-1.17-.225T18.78 19.5l-2.7-2.7H7.92l-2.7 2.7q-.45.45-.99.675t-1.17.225Zm14.94-7.2q.51 0 .855-.345T19.2 12q0-.51-.345-.855T18 10.8q-.51 0-.855.345T16.8 12q0 .51.345 .855T18 13.2Zm-2.4-3.6q.51 0 .855-.345T16.8 8.4q0-.51-.345-.855T15.6 7.2q-.51 0-.855.345T14.4 8.4q0 .51.345 .855T15.6 9.6ZM6.9 13.2h1.8v-2.1h2.1v-1.8h-2.1v-2.1h-1.8v2.1h-2.1v1.8h2.1v2.1Z",
      viewBox: "0 0 24 24",
      size: 20
    }
  };

  // src/lib/storage.ts
  var DEFAULT_SETTINGS = {
    platform: "meta",
    // Default to Meta Quest / VR as highlighted by user request
    voiceSpoof: true,
    memberListBadge: true,
    profileBadge: true,
    vcJoinToast: true
  };
  var BUCKET_NAME = "unbound.device-spoof";
  function getBucket() {
    return storage.getBucket(BUCKET_NAME);
  }
  function getSetting(key) {
    try {
      const bucket = getBucket();
      return bucket.get(key, DEFAULT_SETTINGS[key]);
    } catch {
      return DEFAULT_SETTINGS[key];
    }
  }
  function setSetting(key, value) {
    try {
      const bucket = getBucket();
      bucket.set(key, value);
    } catch (err) {
      console.error("[DeviceSpoof] Failed to save setting:", key, err);
    }
  }

  // src/lib/gateway.ts
  var OP_IDENTIFY = 2;
  var origSend = null;
  var currentSocket = null;
  function getGatewayModule() {
    return metro.findByProps("getSocket", "isConnected") ?? metro.findByProps("getSocket") ?? null;
  }
  function getSocket() {
    const mod = getGatewayModule();
    return mod?.getSocket?.() ?? null;
  }
  function getActiveSpoofConfig() {
    const platformId = getSetting("platform");
    if (platformId === "off") return null;
    return PLATFORMS[platformId] ?? null;
  }
  function patchSocket(socket) {
    if (!socket || socket.__deviceSpoofPatched) return;
    origSend = socket.send.bind(socket);
    socket.send = function(op, data, ...args) {
      if (op === OP_IDENTIFY && data?.properties) {
        const config = getActiveSpoofConfig();
        if (config?.properties) {
          Object.assign(data.properties, config.properties);
          if ("$os" in data.properties) data.properties.$os = config.properties.os;
          if ("$browser" in data.properties) data.properties.$browser = config.properties.browser;
          if ("$device" in data.properties) data.properties.$device = config.properties.device;
          console.log(
            `[DeviceSpoof] Intercepted IDENTIFY -> Spoofed as: ${config.label} (${config.properties.browser} / ${config.properties.os})`
          );
        }
      }
      return origSend.apply(this, [op, data, ...args]);
    };
    socket.__deviceSpoofPatched = true;
    currentSocket = socket;
    console.log("[DeviceSpoof] Gateway socket successfully patched");
  }
  function unpatchSocket() {
    if (currentSocket && origSend) {
      currentSocket.send = origSend;
      delete currentSocket.__deviceSpoofPatched;
      console.log("[DeviceSpoof] Gateway socket unpatched");
    }
    origSend = null;
    currentSocket = null;
  }
  function forceIdentify() {
    const socket = getSocket();
    if (!socket) {
      console.warn("[DeviceSpoof] Cannot force re-identify: Gateway socket not found");
      return false;
    }
    if (!socket.__deviceSpoofPatched) {
      patchSocket(socket);
    }
    socket.sessionId = null;
    socket.seq = 0;
    const ws = socket.webSocket;
    if (ws && typeof ws.close === "function") {
      if (ws.readyState !== 2 && ws.readyState !== 3) {
        ws.close(1e3);
        console.log("[DeviceSpoof] WebSocket closed (code 1000) for re-identify");
        return true;
      }
    } else if (typeof socket.close === "function") {
      socket.close();
      setTimeout(() => socket.connect?.(), 300);
      return true;
    }
    return false;
  }
  function getSocketStatus() {
    const socket = getSocket();
    const config = getActiveSpoofConfig();
    return {
      connected: !!socket?.isConnected?.(),
      patched: !!socket?.__deviceSpoofPatched,
      sessionId: socket?.sessionId ? String(socket.sessionId).slice(0, 8) + "..." : "None (Ready to Identify)",
      currentPlatform: config ? config.label : "Disabled / Real Device"
    };
  }

  // src/patches/socket.ts
  function patchGateway() {
    const Gateway = getGatewayModule();
    if (!Gateway) {
      console.warn("[DeviceSpoof] Gateway module not found. Retrying lazily...");
      return;
    }
    const socket = getSocket();
    if (socket) {
      patchSocket(socket);
    }
    if (typeof Gateway.getSocket === "function") {
      patcher.after(Gateway, "getSocket", ({ result }) => {
        if (result) patchSocket(result);
        return result;
      });
    }
    console.log("[DeviceSpoof] Gateway manager initialized");
  }
  function unpatchGateway() {
    unpatchSocket();
  }

  // src/patches/presence.ts
  function getCurrentUserId() {
    try {
      const UserStore = flux.getStore("User");
      return UserStore?.getCurrentUser?.()?.id ?? null;
    } catch {
      return null;
    }
  }
  function patchPresence() {
    const PresenceStore = flux.getStore("Presence");
    const SessionsStore = flux.getStore("Sessions");
    if (PresenceStore && typeof PresenceStore.getClientStatus === "function") {
      patcher.after(PresenceStore, "getClientStatus", ({ args: [userId], result }) => {
        const config = getActiveSpoofConfig();
        if (!config || !config.properties) return result;
        const myId = getCurrentUserId();
        if (myId && userId === myId) {
          const clientKey = config.client === "default" ? "mobile" : config.client;
          return {
            ...result || {},
            [clientKey]: "online"
          };
        }
        return result;
      });
    }
    if (SessionsStore && typeof SessionsStore.getSessions === "function") {
      patcher.after(SessionsStore, "getSessions", ({ result }) => {
        const config = getActiveSpoofConfig();
        if (!config || !config.properties || !result || typeof result !== "object") return result;
        const socket = getSocket();
        const activeSessionId = socket?.sessionId;
        const modified = { ...result };
        for (const [id, session] of Object.entries(modified)) {
          if (!activeSessionId || id === activeSessionId) {
            modified[id] = {
              ...session,
              clientInfo: {
                ...session?.clientInfo || {},
                client: config.client === "default" ? "mobile" : config.client,
                os: config.properties.os
              }
            };
          }
        }
        return modified;
      });
    }
    console.log("[DeviceSpoof] Presence & SessionsStore patched");
  }

  // react-shim:react
  var getR = () => {
    if (typeof React !== "undefined" && React) return React;
    if (typeof globalThis !== "undefined" && globalThis.React) return globalThis.React;
    if (typeof window !== "undefined" && window.React) return window.React;
    return {};
  };
  var useState = (...args) => getR().useState?.(...args);
  var cloneElement = (...args) => getR().cloneElement?.(...args);
  var react_default = new Proxy({}, { get: (_, prop) => getR()[prop] });

  // rn-shim:react-native
  var getRN = () => {
    if (typeof ReactNative !== "undefined" && ReactNative) return ReactNative;
    if (typeof globalThis !== "undefined" && globalThis.ReactNative) return globalThis.ReactNative;
    if (typeof window !== "undefined" && window.ReactNative) return window.ReactNative;
    const u = typeof unbound !== "undefined" ? unbound : typeof window !== "undefined" ? window.unbound : null;
    if (u && u.metro) {
      return u.metro.common?.ReactNative || u.metro.findByProps?.("StyleSheet") || {};
    }
    return {};
  };
  var View = (props) => {
    const V = getRN().View;
    const R = typeof React !== "undefined" ? React : typeof window !== "undefined" ? window.React : null;
    return V && R ? R.createElement(V, props) : null;
  };
  var Text = (props) => {
    const T = getRN().Text;
    const R = typeof React !== "undefined" ? React : typeof window !== "undefined" ? window.React : null;
    return T && R ? R.createElement(T, props) : null;
  };
  var StyleSheet = {
    create: (styles3) => {
      const rn = getRN();
      if (rn && rn.StyleSheet && typeof rn.StyleSheet.create === "function") {
        try {
          return rn.StyleSheet.create(styles3);
        } catch {
        }
      }
      return styles3;
    },
    flatten: (styles3) => {
      const rn = getRN();
      if (rn && rn.StyleSheet && typeof rn.StyleSheet.flatten === "function") {
        try {
          return rn.StyleSheet.flatten(styles3);
        } catch {
        }
      }
      return Array.isArray(styles3) ? Object.assign({}, ...styles3.filter(Boolean)) : styles3;
    }
  };
  var react_native_default = new Proxy({}, { get: (_, prop) => getRN()[prop] });

  // src/components/PlatformBadge.tsx
  function PlatformBadge({
    platformId,
    size = 18,
    color,
    showPill = false,
    showLabel = false
  }) {
    const config = PLATFORMS[platformId] ?? PLATFORMS.off;
    const iconKey = platformId === "meta" ? "vr" : platformId === "xbox" ? "xbox" : platformId === "ps5" || platformId === "ps4" ? "playstation" : platformId === "windows" || platformId === "macos" || platformId === "linux" ? "desktop" : platformId === "web" ? "web" : platformId === "android" || platformId === "ios" ? "mobile" : "embedded";
    const iconData = SVG_ICONS[iconKey] ?? SVG_ICONS.embedded;
    const badgeColor = color ?? config.color;
    const SVGModule = metro.common?.SVG ?? metro.findByProps("Svg", "Path");
    const Svg = SVGModule?.Svg;
    const Path = SVGModule?.Path;
    const renderIcon = () => {
      if (Svg && Path && iconData?.path) {
        return /* @__PURE__ */ react_default.createElement(Svg, { width: size, height: size, viewBox: iconData.viewBox, fill: badgeColor }, /* @__PURE__ */ react_default.createElement(Path, { d: iconData.path, fill: badgeColor }));
      }
      return /* @__PURE__ */ react_default.createElement(Text, { style: { fontSize: size - 2 } }, config.glyph);
    };
    if (showPill) {
      return /* @__PURE__ */ react_default.createElement(View, { style: styles.pillContainer }, /* @__PURE__ */ react_default.createElement(View, { style: styles.pillBadge }, renderIcon()), showLabel && /* @__PURE__ */ react_default.createElement(Text, { style: [styles.pillLabel, { color: badgeColor }] }, config.label));
    }
    return /* @__PURE__ */ react_default.createElement(View, { style: styles.iconContainer }, renderIcon(), showLabel && /* @__PURE__ */ react_default.createElement(Text, { style: [styles.inlineLabel, { color: badgeColor }] }, config.label));
  }
  var styles = StyleSheet.create({
    iconContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 3
    },
    inlineLabel: {
      fontSize: 12,
      fontWeight: "600",
      marginLeft: 4
    },
    pillContainer: {
      flexDirection: "row",
      alignItems: "center"
    },
    pillBadge: {
      backgroundColor: "#ffffff",
      borderRadius: 14,
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.08)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 2,
      elevation: 2,
      alignItems: "center",
      justifyContent: "center"
    },
    pillLabel: {
      fontSize: 12,
      fontWeight: "700",
      marginLeft: 6
    }
  });

  // src/patches/voice.tsx
  var dispatcherListener = null;
  var lastJoinedChannel = null;
  function getCurrentUserId2() {
    try {
      const UserStore = flux.getStore("User");
      return UserStore?.getCurrentUser?.()?.id ?? null;
    } catch {
      return null;
    }
  }
  function initVoiceListener() {
    const Dispatcher = flux.dispatcher;
    if (!Dispatcher || typeof Dispatcher.subscribe !== "function") return;
    dispatcherListener = (action) => {
      if (action.type === "VOICE_CHANNEL_SELECT") {
        const channelId = action.channelId;
        if (channelId && channelId !== lastJoinedChannel) {
          lastJoinedChannel = channelId;
          const config = getActiveSpoofConfig();
          const showToast = getSetting("vcJoinToast");
          if (config && showToast) {
            toasts.show({
              title: "Connected to Voice Chat",
              content: `Joined voice channel spoofed as ${config.label} ${config.glyph}`
            });
          }
        } else if (!channelId) {
          lastJoinedChannel = null;
        }
      }
    };
    try {
      Dispatcher.subscribe("VOICE_CHANNEL_SELECT", dispatcherListener);
    } catch (e) {
      console.warn("[DeviceSpoof] Voice channel dispatcher subscription failed:", e);
    }
  }
  function cleanupVoiceListener() {
    const Dispatcher = flux.dispatcher;
    if (Dispatcher && dispatcherListener && typeof Dispatcher.unsubscribe === "function") {
      try {
        Dispatcher.unsubscribe("VOICE_CHANNEL_SELECT", dispatcherListener);
      } catch {
      }
    }
    dispatcherListener = null;
    lastJoinedChannel = null;
  }
  function patchVoiceChannelRows() {
    const VoiceUserComponent = metro.findByName("VoiceUser") ?? metro.findByDisplayName("VoiceUser") ?? metro.findByFilePath("VoiceUser.tsx") ?? metro.findByFilePath("modules/voice/native/VoiceUser.tsx") ?? metro.findByFilePath("VoiceChannelParticipant.tsx") ?? null;
    if (!VoiceUserComponent) {
      console.log("[DeviceSpoof] VoiceUser component will be decorated dynamically via voice states");
      return;
    }
    try {
      patcher.react.after(VoiceUserComponent, "default", ({ props, result }) => {
        const voiceSpoofEnabled = getSetting("voiceSpoof");
        if (!voiceSpoofEnabled || !result) return result;
        const myId = getCurrentUserId2();
        const userId = props?.user?.id ?? props?.userId;
        const config = getActiveSpoofConfig();
        if (!config || !userId) return result;
        if (userId === myId) {
          const badge = /* @__PURE__ */ react_default.createElement(
            PlatformBadge,
            {
              key: "voice-spoof-badge",
              platformId: config.id,
              size: 14,
              showPill: true
            }
          );
          const element = result;
          const children = element.props?.children;
          if (children === void 0) {
            return /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, result, badge);
          }
          return cloneElement(element, {
            children: [...[children].flat(), badge]
          });
        }
        return result;
      });
      console.log("[DeviceSpoof] Voice channel participant component patched");
    } catch (e) {
      console.warn("[DeviceSpoof] Could not patch VoiceUser component:", e);
    }
  }

  // src/patches/member-list.tsx
  function getCurrentUserId3() {
    try {
      const UserStore = flux.getStore("User");
      return UserStore?.getCurrentUser?.()?.id ?? null;
    } catch {
      return null;
    }
  }
  function patchMemberList() {
    const UserRow = metro.findByFilePath("modules/main_tabs_v2/native/shared_components/user_list/UserRow.tsx") ?? metro.findByName("UserRow") ?? null;
    if (!UserRow) {
      console.warn("[DeviceSpoof] UserRow module not found, skipping member list patch");
      return;
    }
    try {
      patcher.react.after(UserRow, "default", ({ props, result }) => {
        const enabled = getSetting("memberListBadge");
        if (!enabled || !result) return result;
        const myId = getCurrentUserId3();
        const userId = props?.user?.id ?? props?.userId;
        const config = getActiveSpoofConfig();
        if (!config || !userId || userId !== myId) return result;
        const badge = /* @__PURE__ */ react_default.createElement(
          PlatformBadge,
          {
            key: "member-list-spoof-badge",
            platformId: config.id,
            size: 14,
            showPill: true
          }
        );
        const element = result;
        const children = element.props?.children;
        if (children === void 0) {
          return /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, result, badge);
        }
        return cloneElement(element, {
          children: [...[children].flat(), badge]
        });
      });
      console.log("[DeviceSpoof] Member list UserRow patched");
    } catch (e) {
      console.warn("[DeviceSpoof] Could not patch UserRow:", e);
    }
  }

  // src/patches/profile.tsx
  function getCurrentUserId4() {
    try {
      const UserStore = flux.getStore("User");
      return UserStore?.getCurrentUser?.()?.id ?? null;
    } catch {
      return null;
    }
  }
  function patchUserProfile() {
    const UserProfilePrimaryInfo = metro.findByFilePath("modules/user_profile/native/UserProfilePrimaryInfo.tsx") ?? metro.findByName("UserProfilePrimaryInfo") ?? null;
    if (!UserProfilePrimaryInfo) {
      console.warn("[DeviceSpoof] UserProfilePrimaryInfo module not found, skipping profile patch");
      return;
    }
    try {
      patcher.react.after(UserProfilePrimaryInfo, "default", ({ props, result }) => {
        const enabled = getSetting("profileBadge");
        if (!enabled || !result) return result;
        const myId = getCurrentUserId4();
        const userId = props?.user?.id ?? props?.userId;
        const config = getActiveSpoofConfig();
        if (!config || !userId || userId !== myId) return result;
        const badge = /* @__PURE__ */ react_default.createElement(
          PlatformBadge,
          {
            key: "profile-spoof-badge",
            platformId: config.id,
            size: 18,
            showPill: true,
            showLabel: true
          }
        );
        const element = result;
        const children = element.props?.children;
        if (children === void 0) {
          return /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, result, badge);
        }
        return cloneElement(element, {
          children: [...[children].flat(), badge]
        });
      });
      console.log("[DeviceSpoof] UserProfilePrimaryInfo patched");
    } catch (e) {
      console.warn("[DeviceSpoof] Could not patch UserProfilePrimaryInfo:", e);
    }
  }

  // src/components/DevicePreview.tsx
  function DevicePreview({ platformId }) {
    const config = PLATFORMS[platformId] ?? PLATFORMS.off;
    const isEnabled = platformId !== "off";
    return /* @__PURE__ */ react_default.createElement(View, { style: styles2.card }, /* @__PURE__ */ react_default.createElement(View, { style: styles2.header }, /* @__PURE__ */ react_default.createElement(Text, { style: styles2.headerTitle }, "ACTIVE PREVIEW"), /* @__PURE__ */ react_default.createElement(View, { style: [styles2.statusTag, isEnabled ? styles2.statusActive : styles2.statusDisabled] }, /* @__PURE__ */ react_default.createElement(Text, { style: styles2.statusTagText }, isEnabled ? "SPOOF ACTIVE" : "OFF"))), /* @__PURE__ */ react_default.createElement(View, { style: styles2.previewBox }, /* @__PURE__ */ react_default.createElement(View, { style: styles2.avatarMock }, /* @__PURE__ */ react_default.createElement(Text, { style: styles2.avatarLetter }, "U"), /* @__PURE__ */ react_default.createElement(View, { style: styles2.badgeOverlay }, /* @__PURE__ */ react_default.createElement(PlatformBadge, { platformId, size: 16, showPill: true }))), /* @__PURE__ */ react_default.createElement(View, { style: styles2.infoCol }, /* @__PURE__ */ react_default.createElement(View, { style: styles2.onlineBadge }, /* @__PURE__ */ react_default.createElement(View, { style: [styles2.onlineDot, { backgroundColor: config.color }] }), /* @__PURE__ */ react_default.createElement(Text, { style: styles2.onlineText }, "Online")), /* @__PURE__ */ react_default.createElement(Text, { style: styles2.deviceName }, config.label), /* @__PURE__ */ react_default.createElement(Text, { style: styles2.deviceCategory }, config.category, " \u2022 Voice Chat & Gateway"))), config.properties && /* @__PURE__ */ react_default.createElement(View, { style: styles2.payloadDetails }, /* @__PURE__ */ react_default.createElement(Text, { style: styles2.payloadText }, /* @__PURE__ */ react_default.createElement(Text, { style: styles2.payloadKey }, "Client: "), config.properties.browser), /* @__PURE__ */ react_default.createElement(Text, { style: styles2.payloadText }, /* @__PURE__ */ react_default.createElement(Text, { style: styles2.payloadKey }, "OS: "), config.properties.os), /* @__PURE__ */ react_default.createElement(Text, { style: styles2.payloadText }, /* @__PURE__ */ react_default.createElement(Text, { style: styles2.payloadKey }, "Device: "), config.properties.device)));
  }
  var styles2 = StyleSheet.create({
    card: {
      backgroundColor: "#2b2d31",
      borderRadius: 12,
      padding: 14,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: "#383a40"
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12
    },
    headerTitle: {
      fontSize: 11,
      fontWeight: "800",
      color: "#949ba4",
      letterSpacing: 0.5
    },
    statusTag: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6
    },
    statusActive: {
      backgroundColor: "rgba(35, 165, 90, 0.2)"
    },
    statusDisabled: {
      backgroundColor: "rgba(128, 132, 142, 0.2)"
    },
    statusTagText: {
      fontSize: 10,
      fontWeight: "800",
      color: "#23a55a"
    },
    previewBox: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8
    },
    avatarMock: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#5865f2",
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    },
    avatarLetter: {
      color: "#ffffff",
      fontSize: 20,
      fontWeight: "700"
    },
    badgeOverlay: {
      position: "absolute",
      bottom: -6,
      right: -8
    },
    infoCol: {
      marginLeft: 18,
      flex: 1
    },
    onlineBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#1e1f22",
      alignSelf: "flex-start",
      paddingHorizontal: 7,
      paddingVertical: 2,
      borderRadius: 10,
      marginBottom: 4
    },
    onlineDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      marginRight: 5
    },
    onlineText: {
      fontSize: 11,
      fontWeight: "700",
      color: "#dbdee1"
    },
    deviceName: {
      fontSize: 15,
      fontWeight: "700",
      color: "#f2f3f5"
    },
    deviceCategory: {
      fontSize: 11,
      color: "#949ba4",
      marginTop: 1
    },
    payloadDetails: {
      marginTop: 10,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: "#383a40"
    },
    payloadText: {
      fontSize: 11,
      color: "#b5bac1",
      fontFamily: "monospace",
      marginVertical: 1
    },
    payloadKey: {
      color: "#949ba4",
      fontWeight: "600"
    }
  });

  // src/settings.tsx
  function SettingsPanel() {
    const [platform, setPlatformState] = useState(() => getSetting("platform"));
    const [voiceSpoof, setVoiceSpoofState] = useState(() => getSetting("voiceSpoof"));
    const [memberListBadge, setMemberListState] = useState(
      () => getSetting("memberListBadge")
    );
    const [profileBadge, setProfileBadgeState] = useState(() => getSetting("profileBadge"));
    const [vcJoinToast, setVcJoinToastState] = useState(() => getSetting("vcJoinToast"));
    const [socketInfo, setSocketInfo] = useState(() => getSocketStatus());
    const handlePlatformChange = (newPlatform) => {
      setPlatformState(newPlatform);
      setSetting("platform", newPlatform);
      const ok = forceIdentify();
      setTimeout(() => setSocketInfo(getSocketStatus()), 500);
      const config = PLATFORMS[newPlatform];
      toasts.show({
        title: "Platform Updated",
        content: `Now spoofing as ${config.label} ${config.glyph}`
      });
    };
    const handleManualReconnect = () => {
      const success = forceIdentify();
      setTimeout(() => setSocketInfo(getSocketStatus()), 500);
      if (success) {
        toasts.show({
          title: "Gateway Reconnected",
          content: "A fresh IDENTIFY packet was transmitted with current spoof properties."
        });
      } else {
        toasts.show({
          title: "Gateway Reconnect",
          content: "Waiting for Gateway socket to re-establish connection..."
        });
      }
    };
    return /* @__PURE__ */ react_default.createElement(ui.Page, null, /* @__PURE__ */ react_default.createElement(ui.Section, { title: "ACTIVE SPOOF PREVIEW" }, /* @__PURE__ */ react_default.createElement(DevicePreview, { platformId: platform }), /* @__PURE__ */ react_default.createElement(
      ui.ButtonRow,
      {
        label: "Force Gateway Re-Identify",
        subLabel: "Triggers immediate handshake so Voice Channels and profiles update instantly",
        variant: "primary",
        onPress: handleManualReconnect
      }
    )), /* @__PURE__ */ react_default.createElement(ui.Section, { title: "VIRTUAL REALITY (VR)" }, /* @__PURE__ */ react_default.createElement(
      ui.RadioRow,
      {
        label: PLATFORMS.meta.label,
        subLabel: PLATFORMS.meta.description,
        selected: platform === "meta",
        onPress: () => handlePlatformChange("meta")
      }
    )), /* @__PURE__ */ react_default.createElement(ui.Section, { title: "GAMING CONSOLES" }, /* @__PURE__ */ react_default.createElement(
      ui.RadioRow,
      {
        label: PLATFORMS.xbox.label,
        subLabel: PLATFORMS.xbox.description,
        selected: platform === "xbox",
        onPress: () => handlePlatformChange("xbox")
      }
    ), /* @__PURE__ */ react_default.createElement(
      ui.RadioRow,
      {
        label: PLATFORMS.ps5.label,
        subLabel: PLATFORMS.ps5.description,
        selected: platform === "ps5",
        onPress: () => handlePlatformChange("ps5")
      }
    ), /* @__PURE__ */ react_default.createElement(
      ui.RadioRow,
      {
        label: PLATFORMS.ps4.label,
        subLabel: PLATFORMS.ps4.description,
        selected: platform === "ps4",
        onPress: () => handlePlatformChange("ps4")
      }
    )), /* @__PURE__ */ react_default.createElement(ui.Section, { title: "DESKTOP & PC" }, /* @__PURE__ */ react_default.createElement(
      ui.RadioRow,
      {
        label: PLATFORMS.windows.label,
        subLabel: PLATFORMS.windows.description,
        selected: platform === "windows",
        onPress: () => handlePlatformChange("windows")
      }
    ), /* @__PURE__ */ react_default.createElement(
      ui.RadioRow,
      {
        label: PLATFORMS.macos.label,
        subLabel: PLATFORMS.macos.description,
        selected: platform === "macos",
        onPress: () => handlePlatformChange("macos")
      }
    ), /* @__PURE__ */ react_default.createElement(
      ui.RadioRow,
      {
        label: PLATFORMS.linux.label,
        subLabel: PLATFORMS.linux.description,
        selected: platform === "linux",
        onPress: () => handlePlatformChange("linux")
      }
    )), /* @__PURE__ */ react_default.createElement(ui.Section, { title: "WEB BROWSERS" }, /* @__PURE__ */ react_default.createElement(
      ui.RadioRow,
      {
        label: PLATFORMS.web.label,
        subLabel: PLATFORMS.web.description,
        selected: platform === "web",
        onPress: () => handlePlatformChange("web")
      }
    )), /* @__PURE__ */ react_default.createElement(ui.Section, { title: "MOBILE DEVICES" }, /* @__PURE__ */ react_default.createElement(
      ui.RadioRow,
      {
        label: PLATFORMS.android.label,
        subLabel: PLATFORMS.android.description,
        selected: platform === "android",
        onPress: () => handlePlatformChange("android")
      }
    ), /* @__PURE__ */ react_default.createElement(
      ui.RadioRow,
      {
        label: PLATFORMS.ios.label,
        subLabel: PLATFORMS.ios.description,
        selected: platform === "ios",
        onPress: () => handlePlatformChange("ios")
      }
    )), /* @__PURE__ */ react_default.createElement(ui.Section, { title: "RESTORE ORIGINAL" }, /* @__PURE__ */ react_default.createElement(
      ui.RadioRow,
      {
        label: PLATFORMS.off.label,
        subLabel: PLATFORMS.off.description,
        selected: platform === "off",
        onPress: () => handlePlatformChange("off")
      }
    )), /* @__PURE__ */ react_default.createElement(ui.Section, { title: "DISPLAY & VOICE CHAT OPTIONS" }, /* @__PURE__ */ react_default.createElement(
      ui.SwitchRow,
      {
        label: "Voice Chat (VC) Badges",
        subLabel: "Displays your spoofed platform badge beside your name when connected to Voice Channels",
        value: voiceSpoof,
        onValueChange: (val) => {
          setVoiceSpoofState(val);
          setSetting("voiceSpoof", val);
        }
      }
    ), /* @__PURE__ */ react_default.createElement(
      ui.SwitchRow,
      {
        label: "Voice Channel Join Alert",
        subLabel: "Shows a confirmation toast notifying you of your active spoofed platform upon entering VC",
        value: vcJoinToast,
        onValueChange: (val) => {
          setVcJoinToastState(val);
          setSetting("vcJoinToast", val);
        }
      }
    ), /* @__PURE__ */ react_default.createElement(
      ui.SwitchRow,
      {
        label: "Member List Badge",
        subLabel: "Show platform indicator badge next to your username in server member lists",
        value: memberListBadge,
        onValueChange: (val) => {
          setMemberListState(val);
          setSetting("memberListBadge", val);
        }
      }
    ), /* @__PURE__ */ react_default.createElement(
      ui.SwitchRow,
      {
        label: "User Profile Badge",
        subLabel: "Show platform badge in user profile cards",
        value: profileBadge,
        onValueChange: (val) => {
          setProfileBadgeState(val);
          setSetting("profileBadge", val);
        }
      }
    )), /* @__PURE__ */ react_default.createElement(ui.Section, { title: "GATEWAY DIAGNOSTICS" }, /* @__PURE__ */ react_default.createElement(
      ui.TableRow,
      {
        label: "Socket State",
        subLabel: socketInfo.connected ? "Connected" : "Connecting / Idle"
      }
    ), /* @__PURE__ */ react_default.createElement(
      ui.TableRow,
      {
        label: "Active Session ID",
        subLabel: socketInfo.sessionId ?? "None"
      }
    ), /* @__PURE__ */ react_default.createElement(
      ui.TableRow,
      {
        label: "Socket Interceptor",
        subLabel: socketInfo.patched ? "Active (Patched)" : "Inactive"
      }
    )));
  }

  // src/index.tsx
  function start() {
    console.log("[DeviceSpoof] Plugin starting...");
    patchGateway();
    patchPresence();
    initVoiceListener();
    patchVoiceChannelRows();
    patchMemberList();
    patchUserProfile();
    const Gateway = getGatewayModule();
    if (Gateway?.isConnected?.()) {
      console.log("[DeviceSpoof] Client already connected. Triggering initial re-identify...");
      forceIdentify();
    }
    console.log("[DeviceSpoof] Plugin started successfully!");
  }
  function stop() {
    console.log("[DeviceSpoof] Plugin stopping...");
    cleanupVoiceListener();
    unpatchGateway();
    patcher.unpatchAll();
    const Gateway = getGatewayModule();
    if (Gateway?.isConnected?.()) {
      forceIdentify();
    }
    console.log("[DeviceSpoof] Plugin stopped and restored to default state.");
  }
  return __toCommonJS(index_exports);
})();return this.__plugin;}})