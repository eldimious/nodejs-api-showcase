const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configuration');
const errors = require('../common/errors');
console.log('asdasdasdasdas')

const authenticationError = new errors.Unauthorized('Invalid user token', 'INVALID_TOKEN');

module.exports = function(req, res, next) {
  let token = req.headers['authorization'];
  console.log("mmmmmmmmm", token)
  if (token) {
    token = token.includes('Bearer') ? token.split(' ').pop() : token;
    jwt.verify(token, jwtSecret, (err, decoded) => {
      console.log('errerrerr', err.message)
      if (err) {
        return res.status(401).send({
          status: authenticationError.status,
          data: {
            code: authenticationError.code,
            message: err.message ? err.message : 'Authentication error',
          },
        });
        return new errors.Unauthorized('Invalid user token', 'INVALID_TOKEN');
      }
      return next();
    });
  } else {
    return res.status(401).send({
      status: authenticationError.status,
      data: {
        code: authenticationError.code,
        message: 'Add valid token',
      },
    });
  }
};
