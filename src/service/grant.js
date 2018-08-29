const { BrowserWindow } = require('electron');
const {
  APP_KEY,
  APP_SECRET,
  PROTOCOL,
  API_HOSTNAME,
  API_HOST,
  REDIRECT_URL,
  AUTHORIZE_PATH,
  ACCESS_TOKEN_PATH,
} = require('../../share/CONFIG');
const { proxyRequest } = require('../utils/helpers');
const { GET_ACCESS_TOKEN } = require('../../share/IPC_COMMANDS');

const mainWin = BrowserWindow.getAllWindows()[0];
const ses = mainWin.webContents.session;

const requestAuthFilter = {
  url: [REDIRECT_URL],
};

class Grant {
  constructor() {
    this.webRequest = ses.webRequest;
    this.webRequest.onBeforeRedirect(requestAuthFilter, async details => {
      const url = new URL(details.redirectURL);
      if (url.origin === API_HOST) {
        this.handleRedirectCallback(url.searchParams);
      }
    });
  }
  requestAccessToken() {
    this.showGrantModal();
  }
  showGrantModal() {
    const searchParams = new URLSearchParams({
      client_id: APP_KEY,
      redirect_uri: REDIRECT_URL,
    });
    const url = `${API_HOST}${AUTHORIZE_PATH}?${searchParams.toString()}`;
    this.grantModal = new BrowserWindow({
      width: 800,
      height: 600,
      center: true,
      parent: mainWin,
      modal: true,
      resizable: false,
      useContentSize: true,
    });
    this.grantModal.loadURL(url);
  }
  handleRedirectCallback(searchParams) {
    this.grantModal.close();
    const paramObj = {
      client_id: APP_KEY,
      client_secret: APP_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URL,
    };
    Object.keys(paramObj).forEach(key => {
      searchParams.append(key, paramObj[key]);
    });
    proxyRequest({
      protocol: PROTOCOL,
      hostname: API_HOSTNAME,
      path: `${ACCESS_TOKEN_PATH}?${searchParams.toString()}`,
      method: 'POST',
    }).then(res => {
      const data = JSON.parse(res);
      mainWin.webContents.send(GET_ACCESS_TOKEN, data);
    }).catch(err => {
      // TODO: error handler
      console.log(err);
    });
  }
}

module.exports = new Grant();
