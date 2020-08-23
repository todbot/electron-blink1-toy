// electron-blink1-toy
// @todbot

'use strict'

var electron = require('electron');
var app = electron.app;  // Module to control application life.
var BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

var path = require('path');

const isDevelopment = process.env.NODE_ENV == 'development'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
var mainWindow

function createMainWindow() {
  const window = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: { nodeIntegration: true }
   });

   //
  var loadurl = 'file://' + __dirname + '/build/index.html';
  if (isDevelopment) {
    loadurl = 'http://localhost:8082/'; //`${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  }
  // else {
  //   loadurl = formatUrl({
  //     pathname: path.join(__dirname, 'index.html'),
  //     protocol: 'file',
  //     slashes: true
  //   }))
  // }
  console.log("loadurl=",loadurl);
  window.loadURL( loadurl );

  window.on('closed', () => {
    mainWindow = null
  })

  // window.webContents.on('devtools-opened', () => {
  //   window.focus()
  //   setImmediate(() => {
  //     window.focus()
  //   })
  // })

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  console.log("created window")

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})

app.on('will-quit', function() {
  console.log("electron-blink1-toy: app will-quit");
});
