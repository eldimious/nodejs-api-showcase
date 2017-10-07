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

function not_modified(msg, constr) { //eslint-disable-line
  debug('not_modified');
  Error.captureStackTrace(this, constr || this);
  this.message = msg || 'Not Modified';
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
util.inherits(not_modified, Error);
util.inherits(invalid_argument, Error);
util.inherits(json_parse, Error);

forbidden.prototype.name = 'forbidden';
duplicate.prototype.name = 'duplicate';
unauthorized.prototype.name = 'unauthorized';
not_found.prototype.name = 'not_found';
not_modified.prototype.name = 'not_modified';
invalid_argument.prototype.name = 'invalid_argument';
json_parse.prototype.name = 'json_parse';

exports.forbidden = forbidden;
exports.duplicate = duplicate;
exports.unauthorized = unauthorized;
exports.not_modified = not_modified; //eslint-disable-line
exports.not_found = not_found; //eslint-disable-line
exports.invalid_argument = invalid_argument; //eslint-disable-line
exports.json_parse = json_parse; //eslint-disable-line
