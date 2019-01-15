const errors = require('../../../common/errors');


const getJWTFromAuthHeader = function getJWTFromAuthHeader(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    throw new errors.Unauthorized('Invalid user token', 'INVALID_TOKEN');
  }
  return authHeader.includes('Bearer') ? authHeader.split(' ').pop() : authHeader;
};

module.exports = function authenticateEndpoint(services) {
  return async (req, res, next) => {
    try {
      const jwt = getJWTFromAuthHeader(req);
      const decoded = await services.authService.verifyToken(jwt);
      req.user = decoded;
      return next();
    } catch (error) {
      return next(new errors.Unauthorized('Invalid user token', 'INVALID_TOKEN'));
    }
  };
};
