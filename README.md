# electron-blink1-toy

A simple Electron app to experiment with `node-blink1` & `node-hid`.

Assumes you have blink(1) device plugged in before running app.

To use:
```
yarn
yarn dev
```

To build the application:
```
yarn
yarn dist
```

![screenshot](./screenshot.png)

#### Note:
On certain OS + Electron version combinations, `node-hid` will need to be
recompiled for Electron, so you will need C compiler installed.  
This is not normally needed for Mac & Windows.

For more details on what you need, see:
* https://github.com/node-hid/node-hid#compiling-from-source
