// Register all the services here
const userServiceFactory = require('./userService');
const pictureServiceFactory = require('./pictureService');

module.exports = (interfaces) => {
  const userService = userServiceFactory.init(interfaces);
  const pictureService = pictureServiceFactory.init(interfaces);
  return ({
    userService,
    pictureService,
  });
};
