// Register all the services here
const tweetService = require('./tweet/service');
const authService = require('./auth/service');
const userService = require('./user/service');

module.exports = repositories => ({
  authService: authService(repositories),
  tweetService: tweetService(repositories),
  userService: userService(repositories),
});
