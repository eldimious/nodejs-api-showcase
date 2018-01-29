// Register all the services here
const tweetServiceFactory = require('./tweetService');
const authServiceFactory = require('./authService');

module.exports = (interfaces) => {
  return ({
    authService: authServiceFactory.init(interfaces),
    tweetService: tweetServiceFactory.init(interfaces),
  });
};
