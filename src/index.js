const url = require('url');
const path = require('path');
const { app, BrowserWindow } = require('electron');
const { isDev } = require('./utils/env');
if (isDev) {
  const PATH_APP_NODE_MODULES = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(PATH_APP_NODE_MODULES);
}
// const serviceRegister = require('./serviceRegister');

const gotTheLock = app.requestSingleInstanceLock();
let mainWindow;

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.on('ready', () => {

    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        webSecurity: false,
      },
    });

    let pagePath;
    if (isDev) {
      pagePath = 'http://localhost:8000';
    } else {
      pagePath = url.format({
        protocol: 'file',
        slashes: true,
        pathname: path.join(__dirname, './index.html'),
      });
    }

    mainWindow.loadURL(pagePath);

    if (isDev) {
      mainWindow.openDevTools();
    }

    // serviceRegister({
    //   mainWindow,
    // });
  });

  app.on('window-all-closed', () => {
    app.quit();
  });
}
