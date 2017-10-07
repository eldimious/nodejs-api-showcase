const debug = require('debug')('routes:errors');
const errors = require('../../common/errors');

function sendError(error, req, res, next) { //eslint-disable-line
  debug('send error');
  if (error.constructor === errors.invalid_argument) {
    res.status(400).send({
      status: error.message,
      idx: error.idx,
    });
  } else if (error.constructor === errors.unauthorized) {
    res.status(401).send({
      status: error.message,
    });
  } else if (error.constructor === errors.not_modified) {
    res.status(304).send({
      status: error.message,
    });
  } else if (error.constructor === errors.forbidden) {
    res.status(403).send({
      status: error.message,
    });
  } else if (error.constructor === errors.duplicate) {
    res.status(409).send({
      status: error.message,
    });
    // Include couchbase 'No such key' errors for 404
  } else if (error.constructor === errors.not_found || error.code === 4104 || (error.code === 13)) {
    res.status(404).send({
      status: error.message,
    });
  } else if (error.code === 23) {
    res.status(500).send({
      status: error.message || 'Internal Error',
    });
  } else if (error.constructor === errors.json_parse) {
    res.status(404).send({
      status: error.message,
    });
  } else {
    res.status(500).send({
      status: error.message || 'Internal Error',
    });
  }
}

module.exports = sendError;
