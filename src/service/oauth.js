const https = require('https');
const url = require('url');
const { BrowserWindow, session } = require('electron');
const {
  APP_KEY,
  APP_SECRET,
  PROTOCOL,
  API_HOSTNAME,
} = require('../../share/CONFIG');

const OAUTH_API_ENTITY = {
  protocol: PROTOCOL,
  hostname: API_HOSTNAME,
};
const OAUTH_REDIRECT_URL =  'https://api.weibo.com/oauth2/default.html';
const OAUTH_AUTHORIZE_PATH = '/oauth2/authorize';
const OAUTH_ACCESS_TOKEN_PATH = '/oauth2/access_token';
// const OAUTH_REVOKE_AUTH_URL = 'https://api.weibo.com/oauth2/revokeoauth2';

const requestAuthFilter = {
  url: [OAUTH_REDIRECT_URL],
};

module.exports = class Oauth {
  static get authorizeApi() {
    return url.format(Object.assign({}, OAUTH_API_ENTITY, {
      pathname: OAUTH_AUTHORIZE_PATH,
      query: {
        client_id: APP_KEY,
        response_type: 'code',
        redirect_uri: OAUTH_REDIRECT_URL,
      },
    }));
  }
  static getAccessToken(code) {
    return new Promise((resolve, reject) => {
      const reqOptions = {
        protocol: PROTOCOL,
        hostname: API_HOSTNAME,
        path: `${OAUTH_ACCESS_TOKEN_PATH}?${new URLSearchParams({
          grant_type: 'authorization_code',
          redirect_uri: OAUTH_REDIRECT_URL,
          code,
          client_id: APP_KEY,
          client_secret: APP_SECRET,
        }).toString()}`,
        method: 'POST',
      };
      const req = https.request(reqOptions, res => {
        const { statusCode } = res;
        if (statusCode !== 200) {
          reject(new Error(JSON.stringify({
            statusCode,
            statusMessage: res.statusMessage
          })));
          res.resume();
          return;
        }
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', chunk => rawData += chunk);
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          } catch (err) {
            reject(err);
          }
        });
      });
      req.on('error', err => {
        reject(err);
      });
      req.end();
    });
  }
  constructor(mainWindow) {
    this.parent = mainWindow;
    this.webRequest = session.defaultSession.webRequest;
  }
  requestAuth() {
    return new Promise((resolve, reject) => {
      this.webRequest.onBeforeRedirect(requestAuthFilter, async details => {
        const code = details.redirectURL.replace(`${OAUTH_REDIRECT_URL}?code=`, '');
        try {
          const authResult = await Oauth.getAccessToken(code);
          resolve(authResult);
        } catch (err) {
          reject(err);
        }
        this.afterAuth();
      });
      const parentContentSize = this.parent.getContentSize();
      this.reqAuthView = new BrowserWindow({
        width: parentContentSize[0],
        height: parentContentSize[1],
        center: true,
        parent: this.parent,
        modal: true,
        resizable: false,
        useContentSize: true,
      });
      this.reqAuthView.loadURL(Oauth.authorizeApi);
    });
  }
  /**
   * call this after request auth event
   */
  afterAuth() {
    this.webRequest.onBeforeRedirect(requestAuthFilter, null);
    this.reqAuthView.close();
  }
  revokeAuth() {

  }
};
