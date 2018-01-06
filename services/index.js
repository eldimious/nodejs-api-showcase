// Register all the services here
const tweetServiceFactory = require('./tweetService');
const authServiceFactory = require('./authService');

module.exports = (interfaces) => {
  const tweetService = tweetServiceFactory.init(interfaces);
  const authService = authServiceFactory.init(interfaces);

  return ({
    authService,
    tweetService,
  });
};
