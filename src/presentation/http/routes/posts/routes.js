const express = require('express');
const {
  validateUserToken,
  validatePostId,
  validateCreatePostBody,
} = require('../../middleware/endpointValidator');
const asyncWrapper = require('../../utils/asyncWrapper');
const {
  getDefaultPage,
  getDefaultLimit,
} = require('../../utils/pagination');

// eslint-disable-next-line new-cap
const router = express.Router({ mergeParams: true });

function init({
  postsService,
}) {
  router.get(
    '/',
    asyncWrapper(async (req, res) => {
      const postsList = await postsService.listUserPosts({
        userId: req.params.userId,
        publisher: req.query.publisher,
        page: getDefaultPage(parseInt(req.query.page, 10)),
        limit: getDefaultLimit(parseInt(req.query.limit, 10)),
      });
      return res.send(postsList);
    }),
  );

  router.post(
    '/',
    validateUserToken(),
    validateCreatePostBody(),
    asyncWrapper(async (req, res) => {
      const newPost = await postsService.createUserPost({
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        publisher: req.body.publisher,
        userId: req.params.userId,
      });
      return res.send({
        data: newPost,
      });
    }),
  );

  router.get(
    '/:postId',
    validateUserToken(),
    validatePostId(),
    asyncWrapper(async (req, res) => {
      const postDoc = await postsService.getUserPost({
        postId: req.params.postId,
        userId: req.params.userId,
      });
      return res.send({
        data: postDoc,
      });
    }),
  );

  return router;
}

module.exports.init = init;
