const APP_KEY = '640219300';
const APP_SECRET = '3a8ab08cbf1c4455f14dd7992f9689d7';

const PROTOCOL = 'https:';
const API_HOSTNAME = 'api.weibo.com';
const API_HOST = `${PROTOCOL}//${API_HOSTNAME}`;

const REDIRECT_URL = 'https://api.weibo.com/oauth2/default.html';
const AUTHORIZE_PATH = '/oauth2/authorize';
const ACCESS_TOKEN_PATH = '/oauth2/access_token';


module.exports = {
  APP_KEY,
  APP_SECRET,
  PROTOCOL,
  API_HOSTNAME,
  API_HOST,
  REDIRECT_URL,
  AUTHORIZE_PATH,
  ACCESS_TOKEN_PATH,
};
