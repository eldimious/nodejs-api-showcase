// Register all the services here
const userServiceFactory = require('./userService');

module.exports = (interfaces) => {
  const userService = userServiceFactory.init(interfaces.userInterface);
  return ({
    userService,
  });
};
