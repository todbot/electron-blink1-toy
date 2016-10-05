# electron-blink1-toy

A simple Electron app to experiment with `node-blink1` & `node-hid`.

Tested on Electron v1.2.6.

Assumes you have blink(1) device plugged in before running app.

To use:
```
npm install
npm start
```

Note:
Because `node-hid` will need to be recompiled for Electron, you will need compilers for your OS installed.
For more details on what you need, see: https://github.com/nodejs/node-gyp#installation


![screenshot](./screenshot.png)

Uses the magic of `require('babel-register')` in both the app and renderer to do on-the-fly transpiling

Note: the `node-hid` library needs to be recompiled for Electron. The `electron-rebuild` tool does this,
and should be done automatically for you via the "postinstall" script of this project.  

This project leans heavily on https://github.com/b52/electron-es6-react
