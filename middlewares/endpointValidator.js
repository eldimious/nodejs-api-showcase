'use strict';

const debug = require('debug')('EndpointValidator class');

module.exports = class EndpointValidator {
  constructor() {
    debug('constract EndpointValidator starts');
    this._settings = {
      customValidators: {
        isInArray(item, array) {
          return array.includes(item);
        },
        isMongoObjectID(param) {
          return new RegExp('^[0-9a-fA-F]{24}$').test(param);
        },
      },
    };
    debug('constract EndpointValidator ends');
  }

  get settings() {
    return this._settings;
  }

  set settings(newSettings) {
    this._settings = newSettings;
  }


  requireValidUserId(req, res, next) {
    req.checkParams('id', 'add a valid user id.').isMongoObjectID();
    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).jerror(400, `${result.array({ onlyFirstError: true })[0].msg}`);
      }
      return next();
    });
  }


  requireValidUserCreateBody(req, res, next) {
    req.checkBody('email', 'add a valid email.').notEmpty().isEmail();
    req.checkBody('name', 'name in body required.').notEmpty();
    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).jerror(400, `${result.array({ onlyFirstError: true })[0].msg}`);
      }
      return next();
    });
  }
};
