const errors = require('../../../common/errors');
const authenticationRepository = require('../../../data/repositories/authenticationRepository');
const {
  jwtSecret,
} = require('../../../configuration');

const authentication = authenticationRepository.init();

const getJWTFromAuthHeader = function getJWTFromAuthHeader(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    throw new errors.Unauthorized('Invalid user token', 'INVALID_TOKEN');
  }
  return authHeader.includes('Bearer') ? authHeader.split(' ').pop() : authHeader;
};

module.exports = function authenticateEndpoint() {
  return async (req, res, next) => {
    try {
      const token = getJWTFromAuthHeader(req);
      const decoded = await authentication.verifyToken(token, jwtSecret);
      req.user = decoded;
      return next();
    } catch (error) {
      return next(new errors.Unauthorized('Invalid user token', 'INVALID_TOKEN'));
    }
  };
};
