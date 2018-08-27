const { API_HOST } = require('./CONFIG');

module.exports = {
  'USERS_SHOW': `${API_HOST}/2/users/show.json`,
  'HOME_TIMELINE': `${API_HOST}/2/statuses/home_timeline.json`,
  'USER_TIMELINE': `${API_HOST}/2/statuses/user_timeline.json`,
};
