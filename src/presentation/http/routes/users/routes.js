const express = require('express');
const {
  validateUserToken,
} = require('../../middleware/endpointValidator');
const asyncWrapper = require('../../utils/asyncWrapper');
const {
  toResponseModel,
} = require('./mapper');
const postsRouter = require('../posts/routes');

// eslint-disable-next-line new-cap
const router = express.Router({ mergeParams: true });

function init({ usersService, postsService }) {
  router.get(
    '/:userId',
    validateUserToken(),
    asyncWrapper(async (req, res) => {
      const result = await usersService.getUser({
        userId: req.params.userId,
      });
      return res.send({
        data: {
          ...toResponseModel(result.user),
          posts: result.posts,
        },
      });
    }),
  );

  router.use('/:userId/posts', postsRouter.init({
    postsService,
  }));

  return router;
}

module.exports.init = init;
