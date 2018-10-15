const httpErrors = require('throw-http-errors');

const isCustomError = (error) => {
  if (httpErrors.includes(error.name)) {
    return true;
  }
  return false;
};

const createErrorMessage = (error, defaultMsg) => error && error.message ? error.message : defaultMsg;


module.exports = Object.assign(
  {},
  httpErrors,
  {
    isCustomError,
  },
);
