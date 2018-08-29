const https = require('https');
const SocksProxyAgent = require('socks-proxy-agent');

const proxy = 'socks5://127.0.0.1:1080';
const agent = new SocksProxyAgent(proxy, true);

exports.proxyAgent = agent;

exports.proxyRequest = (config, postData) => {
  Object.assign(config, {
    agent,
  });
  return new Promise((resolve, reject) => {
    const req = https.request(config, res => {
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
        resolve(rawData);
      });
    });
    req.on('error', err => {
      reject(err);
    });
    postData && req.write(postData);
    req.end();
  });
};
