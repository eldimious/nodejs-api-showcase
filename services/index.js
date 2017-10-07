// Register all the services here
const userServiceFactory = require('./userService');
const pictureServiceFactory = require('./pictureService');
const socialNetworkServiceFactory = require('./socialNetworkService');

module.exports = (interfaces) => {
  const userService = userServiceFactory.init(interfaces);
  const pictureService = pictureServiceFactory.init(interfaces);
  const socialNetworkService = socialNetworkServiceFactory.init(interfaces);
  return ({
    userService,
    pictureService,
    socialNetworkService,
  });
};
