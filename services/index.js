// Register all the services here
const userServiceFactory = require('./userService');
const authServiceFactory = require('./authService');

module.exports = (interfaces) => {
  const userService = userServiceFactory.init(interfaces);
  const authService = authServiceFactory.init(interfaces);

  return ({
    authService,
    userService,
  });
};
