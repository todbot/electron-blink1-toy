const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setColor: (r, g, b) => ipcRenderer.invoke('blink1:setColor', r, g, b),
  rescan: () => ipcRenderer.invoke('blink1:rescan'),
  getDevices: () => ipcRenderer.invoke('blink1:getDevices')
})
