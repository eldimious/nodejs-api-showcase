const debug = require('debug')('routes:errors');

const createResponseError = (err, status = 500, code = 'INTERNAL_SERVER_ERROR', defaultMsg = 'Internal Server Error') => ({
  status,
  data: {
    code: err.code || code,
    message: err.message || defaultMsg,
  },
});

function errorHandler(err, req, res, next) { //eslint-disable-line
  const generic4xxError = /^[4][0-9][0-9]$/;
  if (err.status === 401) {
    return res.status(err.status).send(createResponseError(err, 401, 'UNAUTHORIZED', 'Not authorized'));
  } else if (err.status === 400) {
    return res.status(err.status).send(createResponseError(err, 400, 'BAD_REQUEST', 'Bad request'));
  } else if (err.status === 404) {
    return res.status(err.status).send(createResponseError(err, 404, 'RESOURCE_NOT_FOUND', 'The resource was not found'));
  } else if (generic4xxError.test(err.status)) {
    return res.status(err.status).send(createResponseError(err, err.status, err.status, 'Client Error'));
  }
  return res.status(500).send(createResponseError(err, 500, 'INTERNAL_SERVER_ERROR', 'Internal Server Error'));
}

module.exports = errorHandler;

