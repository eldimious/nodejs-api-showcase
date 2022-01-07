const express = require('express');
const {
  validateUserToken,
  validatePostId,
  validateCreatePostBody,
} = require('../../middleware/endpointValidator');
const asyncWrapper = require('../../utils/asyncWrapper');

const router = express.Router({ mergeParams: true });

function init({
  postsService,
}) {
  const DEFAULT_PAGINATION_LIMIT = 25;
  const MAX_PAGINATION_LIMIT = 100;
  const DEFAULT_PAGINATION_PAGE = 1;

  const handlePagination = (options) => {
    const populateOptionsWithPagination = Object.assign({}, options);
    if (isNaN(populateOptionsWithPagination.limit)) {
      populateOptionsWithPagination.limit = DEFAULT_PAGINATION_LIMIT;
    }
    if (isNaN(populateOptionsWithPagination.page)) {
      populateOptionsWithPagination.page = DEFAULT_PAGINATION_PAGE;
    }
    if (populateOptionsWithPagination.limit > MAX_PAGINATION_LIMIT) {
      populateOptionsWithPagination.limit = MAX_PAGINATION_LIMIT;
    }
    return populateOptionsWithPagination;
  };

  router.get('/', asyncWrapper(async (req, res) => {
    const postsList = await postsService.listUserPosts(Object.assign(
      {},
      handlePagination({
        userId: req.params.userId,
        publisher: req.query.publisher,
        page: req.query.page ? parseInt(req.query.page, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit, 10) : 25,
      }),
    ));
    return res.send(postsList);
  }));

  router.post('/',
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
    }));

  router.get('/:postId',
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
    }));

  return router;
}

module.exports.init = init;
