const express = require('express');
const debug = require('debug')('routes-auth');
const EndpointValidator = require('../../middleware/endpointValidator');
const asyncWrapper = require('../utils/asyncWrapper');

const endpointValidator = new EndpointValidator();
const router = express.Router({ mergeParams: true });

function init({ authService }) {
  debug(' ---------- Init routes-AUTH --------- ');

  async function registerNewUser(req, res, next) {
    debug('register new user');
    const options = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password,
    };
    const result = await authService.register(options);
    return res.jsend(result);
  }


  async function loginUser(req, res, next) {
    debug('login user');
    const options = {
      email: req.body.email,
      password: req.body.password,
    };
    const result = await authService.login(options);
    return res.jsend(result);
  }


  router.post('/register', endpointValidator.requireValidUserBody, asyncWrapper(registerNewUser));

  router.post('/login', endpointValidator.requireBodyParamsForLogin, asyncWrapper(loginUser));

  return router;
}

module.exports.init = init;
