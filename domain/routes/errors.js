const debug = require('debug')('routes:errors');
const errors = require('../../common/errors');

function sendError(error, req, res, next) { //eslint-disable-line
  debug('send error', error);
  const generic4xxError = /^[4][0-9][0-9]$/;
  if (error.constructor === errors.invalid_argument) {
    res.status(400).send({
      status: 400,
      data: {
        message: error.message,
        idx: error.idx,
      },
    });
  } else if (error.constructor === errors.unauthorized) {
    res.status(401).send({
      status: 401,
      data: {
        message: error.message,
      },
    });
  } else if (error.constructor === errors.not_modified) {
    res.status(304).send({
      status: 304,
      data: {
        message: error.message,
      },
    });
  } else if (error.constructor === errors.forbidden) {
    res.status(403).send({
      status: 403,
      data: {
        message: error.message,
      },
    });
  } else if (error.constructor === errors.duplicate) {
    res.status(409).send({
      status: 409,
      data: {
        message: error.message,
      },
    });
  } else if (error.constructor === errors.not_found) {
    res.status(404).send({
      status: 404,
      data: {
        message: error.message,
      },
    });
  } else if (error.constructor === errors.json_parse) {
    res.status(404).send({
      status: 404,
      data: {
        message: error.message,
      },
    });
  } else if (generic4xxError.test(error.status)) {
    res.status(error.status).send({
      status: error.status,
      data: {
        message: error.message || 'Client Error',
        stack: error.stack,
      },
    });
  } else {
    res.status(500).send({
      status: 500,
      data: {
        message: 'Internal Server Error',
        error: error.message,
        stack: error.stack,
      },
    });
  }
}

module.exports = sendError;
