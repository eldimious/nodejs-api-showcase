const errors = require('../common/errors');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configuration');

module.exports = function(req, res, next) {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).jerror(401, 'Failed to authenticate token.');
      }
      return next();
    });
  } else {
    return res.status(403).jerror(403, 'No token provided.');
  }
};
