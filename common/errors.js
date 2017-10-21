const util = require('util');
const debug = require('debug')('common:errors');

function forbidden(msg, constr) { //eslint-disable-line
  debug('forbidden');
  Error.captureStackTrace(this, constr || this);
  this.message = msg || 'Forbidden';
}

function duplicate(msg, constr) {
  debug('duplicate');
  Error.captureStackTrace(this, constr || this);
  this.message = msg || 'Forbidden';
}

function unauthorized(msg, constr) {
  debug('unauthorized');
  Error.captureStackTrace(this, constr || this);
  this.message = msg || 'Unauthorized';
}

function not_found(msg, constr) { //eslint-disable-line
  debug('not_found');
  Error.captureStackTrace(this, constr || this);
  this.message = msg || 'Not Found';
}

function invalid_argument(msg, constr) { //eslint-disable-line
  debug('invalid_argument');
  Error.captureStackTrace(this, constr || this);
  this.message = msg || 'InvalidArguments';
}

function json_parse(msg, constr) { //eslint-disable-line
  debug('json_parse');
  Error.captureStackTrace(this, constr || this);
  this.message = msg || 'JsonParse Error';
}

util.inherits(forbidden, Error);
util.inherits(duplicate, Error);
util.inherits(not_found, Error);
util.inherits(unauthorized, Error);
util.inherits(invalid_argument, Error);
util.inherits(json_parse, Error);

forbidden.prototype.name = 'forbidden';
duplicate.prototype.name = 'duplicate';
unauthorized.prototype.name = 'unauthorized';
not_found.prototype.name = 'not_found';
invalid_argument.prototype.name = 'invalid_argument';
json_parse.prototype.name = 'json_parse';

const createErrorMessage = (error, defaultMsg) => error && error.message ? error.message : defaultMsg;

const hasErrorCustomName = (error) => {
  if (error.name === 'not_found' || error.name === 'json_parse' || error.name === 'forbidden' || 
    error.name === 'duplicate' || error.name === 'invalid_argument' || error.name === 'unauthorized') {
    return true;
  }
  return false;
};

const genericErrorHandler = (error, msg = 'Generic Error in interface functions') => {
  if (error && hasErrorCustomName(error)) {
    return Promise.reject(error);
  }
  return Promise.reject(new Error(createErrorMessage(error, msg)));
};

exports.forbidden = forbidden;
exports.duplicate = duplicate;
exports.unauthorized = unauthorized;
exports.not_found = not_found; //eslint-disable-line
exports.invalid_argument = invalid_argument; //eslint-disable-line
exports.json_parse = json_parse; //eslint-disable-line
exports.genericErrorHandler = genericErrorHandler;

