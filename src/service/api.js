const tumblr = require('tumblr.js');
const {
  consumer_key,
  consumer_secret,
  token,
  token_secret,
} = require('../../share/CONFIG');

class Api {
  constructor() {
    this.client = tumblr.createClient({
      consumer_key,
      consumer_secret,
      token,
      token_secret,
    });
  }
}

module.exports = new Api();
