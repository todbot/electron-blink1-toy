const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Blink1 = require('node-blink1')

let mainWindow = null
let blink1 = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function rescanBlink1() {
  if (blink1) {
    blink1.close()
    blink1 = null
  }
  const devices = Blink1.devices()
  if (devices.length > 0) {
    blink1 = new Blink1()
    blink1.fadeToRGB(100, 80, 80, 80)
  }
  return devices
}

ipcMain.handle('blink1:setColor', async (event, r, g, b) => {
  if (!blink1) {
    rescanBlink1()
  }
  if (blink1) {
    blink1.fadeToRGB(100, r, g, b)
  }
})

ipcMain.handle('blink1:rescan', async () => {
  return rescanBlink1()
})

ipcMain.handle('blink1:getDevices', async () => {
  return Blink1.devices()
})

app.whenReady().then(() => {
  createWindow()
  rescanBlink1()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (blink1) {
    blink1.close()
  }
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
