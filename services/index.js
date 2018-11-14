// Register all the services here
const tweetService = require('./tweetService');
const authService = require('./authService');
const userService = require('./userService');

module.exports = interfaces => ({
  authService: authService(interfaces),
  tweetService: tweetService(interfaces),
  userService: userService(interfaces),
});
