const express = require('express');
const EndpointValidator = require('../../middleware/endpointValidator');
const asyncWrapper = require('../../utils/asyncWrapper');
const {
  toResponseModel,
} = require('../users/mapper');

const endpointValidator = new EndpointValidator();
const router = express.Router({ mergeParams: true });

function init({ userService }) {
  router.get('/:userId', endpointValidator.requireSameUser, asyncWrapper(async (req, res) => {
    const result = await userService.get({
      userId: req.params.userId,
    });
    return res.send({
      data: Object.assign({},
        toResponseModel(result.user),
        { posts: result.posts }),
    });
  }));

  return router;
}

module.exports.init = init;
