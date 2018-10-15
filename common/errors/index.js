const httpErrors = require('throw-http-errors');
const Sequelize = require('sequelize');

const isCustomError = (error) => {
  if (httpErrors.includes(error.name)) {
    return true;
  }
  return false;
};

const getSequelizeErrorMsg = (error, defaultMsg) => error && error.message ? error.message : defaultMsg;

const handleSequelizeErrors = (error) => {
  if (error instanceof Sequelize.ValidationError) {
    error.message = error && error.errors && error.errors[0] && error.errors[0] && error.errors[0].message ?
      error.errors[0].message :
      error.message;
    throw new httpErrors.BadRequest(getSequelizeErrorMsg(error, 'Sequelize Validation error'));
  } else if (error instanceof Sequelize.ValidationErrorItem ||
    error instanceof Sequelize.UniqueConstraintError ||
    error instanceof Sequelize.ForeignKeyConstraintError ||
    error instanceof Sequelize.ExclusionConstraintError) {
    throw new httpErrors.BadRequest(getSequelizeErrorMsg(error, 'Sequelize Validation error'));
  }
  throw error;
};

module.exports = Object.assign(
  {},
  httpErrors,
  {
    isCustomError,
    handleSequelizeErrors,
  },
);
