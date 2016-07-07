# electron-blink1-toy

A simple Electron app to experiment with `node-blink1` & `node-hid`.

Tested on Electron v1.2.6.

Assumes you have blink(1) device plugged in before running app.

To use:
```
npm install
npm start
```

Uses the magic of `require('babel-register')` in both the app and renderer to do on-the-fly transpiling

This project leans heavily on https://github.com/b52/electron-es6-react
