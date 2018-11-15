const httpErrors = require('throw-http-errors');

const isCustomError = (error) => {
  if (Object.keys(httpErrors).includes(error.name) || (error.status && Object.keys(httpErrors).includes(error.status.toString()))) {
    return true;
  }
  return false;
};

module.exports = Object.assign(
  {},
  httpErrors,
  {
    isCustomError,
  },
);
