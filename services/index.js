// Register all the services here
const tweetService = require('./tweetService');
const authService = require('./authService');
const userService = require('./userService');

module.exports = repositories => ({
  authService: authService(repositories),
  tweetService: tweetService(repositories),
  userService: userService(repositories),
});
