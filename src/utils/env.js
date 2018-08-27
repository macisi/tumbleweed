const { app } = require('electron');

exports.isDev = process.env.NODE_ENV === 'development',
exports.USER_DATA_PATH = app.getPath('userData');
