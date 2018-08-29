const { API_HOST } = require('./CONFIG');

module.exports = {
  'USERS_SHOW': `${API_HOST}/2/users/show.json`,
  'HOME_TIMELINE': `${API_HOST}/2/statuses/home_timeline.json`,
  'USER_TIMELINE': `${API_HOST}/2/statuses/user_timeline.json`,
  'RATE_LIMIT_STATUS': `${API_HOST}/2/account/rate_limit_status.json`,
  'REVOKE_OAUTH': `${API_HOST}/oauth2/revokeoauth2`,
  'GET_TOKEN_INFO': `${API_HOST}/oauth2/get_token_info`,
};
