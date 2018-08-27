const { ipcMain } = require('electron');
const Oauth = require('./service/oauth');
// const db = require('./service/db');
const {
  RENDERER_MESSAGE,
  REQUEST_AUTH_TOKEN,
  PERSIST_FAILED,
} = require('../share/IPC_COMMANDS');

const dataWrapper = (data, errorMsg = null) => ({
  data,
  success: !errorMsg,
  errorMsg,
});

module.exports = ({ mainWindow }) => {

  ipcMain.on(RENDERER_MESSAGE, async ({ sender }, msgData) => {
    const { data, command } = msgData;
    switch (command) {
    // 请求登陆，获取 access_token
    case REQUEST_AUTH_TOKEN:
      const oauth = new Oauth(mainWindow);
      try {
        const parsedData = await oauth.requestAuth();
        sender.send(REQUEST_AUTH_TOKEN, dataWrapper(parsedData));
      } catch (err) {
        sender.send(REQUEST_AUTH_TOKEN, dataWrapper(null, err.toString()));
      }
      break;
    }
  });

};
