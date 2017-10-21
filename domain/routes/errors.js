const debug = require('debug')('routes:errors');
const errors = require('../../common/errors');

function sendError(error, req, res, next) { //eslint-disable-line
  debug('send error', error);
  const generic4xxError = /^[4][0-9][0-9]$/;
  if (error.constructor === errors.invalid_argument) {
    res.status(400).jerror(400, error.message);
  } else if (error.constructor === errors.unauthorized) {
    res.status(401).jerror(401, error.message);
  } else if (error.constructor === errors.forbidden) {
    res.status(403).jerror(403, error.message);
  } else if (error.constructor === errors.duplicate) {
    res.status(409).jerror(409, error.message);
  } else if (error.constructor === errors.not_found) {
    res.status(404).jerror(404, error.message);
  } else if (error.constructor === errors.json_parse) {
    res.status(404).jerror(404, error.message);
  } else if (generic4xxError.test(error.status)) {
    res.status(error.status).send({
      status: 'error',
      code: error.status,
      message: error.message || 'Client Error',
      stack: error.stack,
    });
  } else {
    res.status(500).send({
      status: 'error',
      code: 500,
      message: 'Internal Server Error',
      error: error.message,
      stack: error.stack,
    });
  }
}

module.exports = sendError;
