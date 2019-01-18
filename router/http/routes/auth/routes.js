const express = require('express');
const EndpointValidator = require('../../middleware/endpointValidator');
const asyncWrapper = require('../../utils/asyncWrapper');
const {
  toResponseModel,
} = require('../users/mapper');

const endpointValidator = new EndpointValidator();
const router = express.Router({ mergeParams: true });

function init({ authService }) {
  router.post('/register', endpointValidator.requireValidUserBody, asyncWrapper(async (req, res) => {
    const result = await authService.register({
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    return res.send({
      data: toResponseModel(result),
    });
  }));

  router.post('/login', endpointValidator.requireBodyParamsForLogin, asyncWrapper(async (req, res) => {
    const result = await authService.login({
      email: req.body.email,
      password: req.body.password,
    });
    return res.send({
      data: {
        token: result.token,
        user: toResponseModel(result.user),
      },
    });
  }));

  return router;
}


module.exports.init = init;
