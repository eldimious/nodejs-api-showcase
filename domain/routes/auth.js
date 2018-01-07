const express = require('express');
const debug = require('debug')('routes-auth');
const EndpointValidator = require('../../middlewares/endpointValidator');

const endpointValidator = new EndpointValidator();
const router = express.Router({ mergeParams: true });

function init({ authService }) {
  debug(' ---------- Init routes-AUTH --------- ');


  const registerNewUser = (req, res, next) => {
    debug('register new user');
    const options = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password,
    };
    return authService.register(options)
      .then(result => res.jsend(result))
      .catch(error => next(error));
  };


  const loginUser = (req, res, next) => {
    debug('login user');
    const options = {
      email: req.body.email,
      password: req.body.password,
    };
    return authService.login(options)
      .then(result => res.jsend(result))
      .catch(error => next(error));
  };


  router.post('/register', endpointValidator.requireValidUserBody, registerNewUser);

  router.post('/login', endpointValidator.requireBodyParamsForLogin, loginUser);

  return router;
}

module.exports.init = init;
