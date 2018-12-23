const express = require('express');
const EndpointValidator = require('../../middleware/endpointValidator');
const asyncWrapper = require('../utils/asyncWrapper');

const endpointValidator = new EndpointValidator();
const router = express.Router({ mergeParams: true });


function init({ userService }) {
  router.get('/:userId', endpointValidator.requireSameUser, asyncWrapper(async (req, res) => {
    const userDoc = await userService.get({
      userId: req.params.userId,
    });
    return res.send({
      data: userDoc,
    });
  }));

  return router;
}

module.exports.init = init;