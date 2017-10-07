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


  requireValidNetwork(req, res, next) {
    req.checkParams('network', 'add a valid source for getting media.').isInArray(['instagram', 'twitter']);
    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).send({ status: `${result.array({ onlyFirstError: true })[0].msg}` });
      }
      return next();
    });
  }


  requireValidType(req, res, next) {
    req.checkParams('type', 'add a valid type for getting media.').isInArray(['hashtag', 'user']);
    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).send({ status: `${result.array({ onlyFirstError: true })[0].msg}` });
      }
      return next();
    });
  }


  requireValidUserId(req, res, next) {
    req.checkParams('id', 'add a valid user id.').isUUID();
    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).send({ status: `${result.array({ onlyFirstError: true })[0].msg}` });
      }
      return next();
    });
  }


  requireValidUserCreateBody(req, res, next) {
    req.checkBody('email', 'add a valid email.').notEmpty().isEmail();
    req.checkBody('name', 'name in body required.').notEmpty();
    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).send({ status: `${result.array({ onlyFirstError: true })[0].msg}` });
      }
      return next();
    });
  }
};
