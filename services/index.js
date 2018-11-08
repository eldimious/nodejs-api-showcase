// Register all the services here
const tweetService = require('./tweetService');
const authService = require('./authService');

module.exports = (interfaces) => {
  return ({
    authService: authService(interfaces),
    tweetService: tweetService(interfaces),
  });
};
