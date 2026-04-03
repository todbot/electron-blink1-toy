# Updates Done

## Version 0.9.0

### Stack Updates
- **Electron**: 21 → 28
- **React**: 17 → 18
- **Build Tool**: webpack → Vite 5
- Removed deprecated packages (electron-webpack, babel presets)

### Architecture Changes
- Added `electron/preload.js` with secure IPC via contextBridge
- Renderer communicates via `window.electronAPI` instead of directly with node-blink1
- Main process handles all Blink1 operations via IPC handlers

### File Changes
- `package.json` - Updated dependencies and scripts
- `vite.config.js` - New Vite configuration with electron plugins
- `electron/main.js` - Main process with IPC handlers
- `electron/preload.js` - Context bridge for secure renderer-main communication
- `index.html` - Vite entry point
- `src/main.jsx` - React 18 entry with createRoot
- `src/Blink1Toy.jsx` - Converted to functional component with hooks
- Removed old `src/main/` and `src/renderer/` directories

### New Commands
- `npm run dev` - Development mode (opens detached DevTools)
- `npm run build` - Build for production
- `npm run build:dir` - Build to unpacked directory
- `npm run preview` - Preview production build
