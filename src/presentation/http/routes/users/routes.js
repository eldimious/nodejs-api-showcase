const express = require('express');
const {
  validateUserToken,
} = require('../../middleware/endpointValidator');
const asyncWrapper = require('../../utils/asyncWrapper');
const {
  toResponseModel,
} = require('../users/mapper');
const postsRouter = require('../posts/routes');

const router = express.Router({ mergeParams: true });

function init({ usersService, postsService, }) {
  router.get('/:userId',
    validateUserToken(),
    asyncWrapper(async (req, res) => {
      const result = await usersService.getUser({
        userId: req.params.userId,
      });
      return res.send({
        data: Object.assign({},
          toResponseModel(result.user),
          { posts: result.posts }),
      });
    }));

  router.use('/:userId/posts', postsRouter.init({
    postsService,
  }));

  return router;
}

module.exports.init = init;
