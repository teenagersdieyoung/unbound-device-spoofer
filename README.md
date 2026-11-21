# 🎮 Device & Console Spoofer for Unbound (Discord Mobile)

> A client modification plugin for **[Unbound](https://unbound.rip/)** (Discord iOS & Android) that allows you to spoof your device identity across Discord, with full support for **VR (Meta Quest)**, **Xbox**, **PlayStation 5 (PS5)**, **PC/Desktop**, and **Web Browsers**, ensuring your spoofed badge is displayed when joining **Discord Voice Channels (VC)**, user profiles, and member lists.

---

## 🌟 Key Features

* **🥽 Meta Quest / VR Spoofing**:
  * Emulates the official Discord Meta Quest VR client (`browser: "Discord VR"`, `os: "Android"`, `device: "Meta Quest"`).
  * Displays the authentic **green VR headset pill badge** (as seen in Discord's native Quest integration) in Voice Chat, user profiles, and member lists.
* **🎮 Xbox Console Spoofing**:
  * Emulates the official Xbox Discord integration (`browser: "Discord Embedded"`, `os: "Xbox"`, `device: "Xbox"`).
  * Displays the **Xbox console badge** when joining voice channels and in user status.
* **🎮 PlayStation 5 (PS5) & PS4 Spoofing**:
  * Emulates the native PlayStation Discord voice integration (`browser: "Discord Embedded"`, `os: "PlayStation 5"`, `device: "PlayStation 5"`).
  * Displays the **PlayStation console badge** when participating in voice channels.
* **🖥️ Desktop & PC Clients**:
  * Spoof as **Windows PC**, **macOS**, or **Linux** Desktop Discord client.
* **🌐 Web Browser**:
  * Spoof as **Google Chrome / Discord Web**.
* **📱 Mobile Devices**:
  * Spoof as **Discord Android** or **Discord iOS (iPhone)**.
* **🎨 Interactive In-App Settings UI**:
  * Live status preview card replicating Discord's avatar and status badge.
  * One-tap platform picker organized by category.
  * **"Force Gateway Re-Identify"** button for instantaneous platform switching without restarting Discord.
  * Toggles for Voice Chat (VC) badges, Member List badges, User Profile badges, and Voice Chat join toast notifications.

---

## 📁 Repository Structure

```
unbound.rip plugin/
├── manifest.json              # Unbound addon manifest
├── package.json               # Package configuration & build scripts
├── tsconfig.json              # TypeScript configuration
├── build.mjs                  # esbuild bundling script
├── dist/                      # Production distribution files
│   ├── manifest.json          # Compiled manifest
│   └── index.js               # Standalone bundled plugin ready for Unbound
├── src/                       # TypeScript source code
│   ├── index.tsx              # Plugin lifecycle entry (start, stop, SettingsPanel)
│   ├── settings.tsx           # Native UI Settings Panel
│   ├── components/
│   │   ├── PlatformBadge.tsx  # Native SVG icon & badge component
│   │   └── DevicePreview.tsx  # Live preview card matching Discord's badge aesthetic
│   ├── lib/
│   │   ├── constants.ts       # Platform presets, SVG paths, colors & identify configs
│   │   ├── gateway.ts         # Gateway WebSocket interception & re-identification engine
│   │   └── storage.ts         # Plugin storage & configuration persistence
│   └── patches/
│       ├── socket.ts          # Gateway WebSocket interception
│       ├── voice.tsx          # Voice channel hooks & Voice User Row badge injection
│       ├── member-list.tsx    # Server member list badge injection
│       ├── profile.tsx        # User profile badge injection
│       └── presence.ts        # SessionsStore & PresenceStore synchronization
```

---

## 🚀 How to Install in Unbound (`unbound.rip`)

### Method 1: Installing via GitHub Repository Link (Recommended)

1. Upload or push this folder to your GitHub account (e.g. `https://github.com/your-username/unbound-device-spoofer`).
2. Open **Discord** on your mobile device with **Unbound** installed.
3. Open **User Settings** (tap your avatar in the bottom tab) $\rightarrow$ scroll down to the **Unbound** section.
4. Tap **Plugins** $\rightarrow$ tap the **+** (Install) icon in the top corner.
5. Paste your repository URL and tap **Install**.
6. Toggle the **Device & Console Spoofer** plugin **ON**.

---

### Method 2: Installing with the Unbound Developer Bridge (CLI)

If you are developing or testing directly on your device:

1. Ensure **Developer Mode** is enabled in Unbound Settings on your mobile device.
2. In the Debugger tab on your phone, enter your PC's local IP address to connect to the Unbound debug bridge.
3. On your PC, in this project folder, run:
   ```bash
   bunx @unbound-app/cli debug push
   ```
   *(Or using Node / npm: compile using `node build.mjs` and push the bundle).*

---

### Method 3: Direct Bundle Installation (`dist/index.js`)

You can host or direct-link the `dist/manifest.json` and `dist/index.js` files:
1. Paste the direct raw URL of `manifest.json` into Unbound's plugin installer.
2. Unbound downloads the bundle and enables the plugin instantly.

---

## 🛠️ How to Use

1. Open Discord on your phone $\rightarrow$ go to **Settings** $\rightarrow$ **Plugins** $\rightarrow$ **Device & Console Spoofer** (tap the gear / settings icon).
2. Choose your desired spoofed device:
   * **Meta Quest / VR** (Shows green VR headset badge)
   * **Xbox Console** (Shows Xbox badge in VC)
   * **PlayStation 5** (Shows PS5 badge in VC)
   * **Windows PC**, **Web Browser**, etc.
3. Tap **"Force Gateway Re-Identify"** or let the automatic reconnect update your session.
4. **Join any Voice Channel (VC)**:
   * A toast notification will confirm: `Joined voice channel spoofed as [Platform]`.
   * Your profile, voice channel tile, and server member list will reflect your selected device!

---

## ⚙️ How It Works (Technical Overview)

1. **Gateway WebSocket Interception (Opcode 2 `IDENTIFY`)**:
   Discord determines your client identity via the `properties` object transmitted during the Gateway handshake. The plugin hooks into Discord's internal `getSocket().send` method, intercepting the `IDENTIFY` packet and replacing the genuine properties with the spoofed values (`os`, `browser`, `device`).
2. **Re-Identification Protocol**:
   To update your device immediately without requiring a Discord restart, the plugin zeroes `socket.sessionId` and triggers a clean WebSocket close (`code 1000`). This forces Discord to issue a brand-new `IDENTIFY` packet rather than a `RESUME` packet.
3. **Voice State & Console Association**:
   When joining a voice channel, Discord's Voice Gateway links the audio session directly to your authenticated Gateway session ID. Because the session is identified as `Discord VR` or `Discord Embedded` (`Xbox`/`PlayStation`), Discord broadcasts the corresponding platform to all channel participants via `CLIENT_PLATFORM` (Voice Gateway Opcode 20).
4. **Local UI Sync**:
   The plugin patches `SessionsStore.getSessions()` and `PresenceStore.getClientStatus()`, along with Discord's `VoiceUser`, `UserRow`, and `UserProfilePrimaryInfo` components, ensuring that your own client displays the exact badge in real time.

---

## ⚠️ Disclaimer & Terms of Service

* Modifying client properties or gateway connection parameters is an unofficial modification and may violate Discord's Terms of Service.
* Use responsibly and at your own discretion.
