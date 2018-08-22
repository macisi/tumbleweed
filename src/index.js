const url = require('url');
const path = require('path');
const { app, BrowserWindow } = require('electron');
const { isDev } = require('./utils/env');


app.on('ready', () => {

  const win = new BrowserWindow({
    width: 800,
    height: 600,
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

  win.loadURL(pagePath);
});

app.on('window-all-closed', () => {
  app.quit();
});
