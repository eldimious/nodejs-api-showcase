const createResponseError = err => ({
  status: err.status,
  data: {
    code: err.code || code,
    message: err.message || defaultMsg,
  },
});

function errorHandler(err, req, res, next) { //eslint-disable-line
  if (errors.isCustomError(err)) {
    return res.status(err.status).send(createResponseError(err));
  }
  const internalError = new errors.InternalServerError();
  return res.status(internalError.status).send(createResponseError(internalError));
};

module.exports = errorHandler;
