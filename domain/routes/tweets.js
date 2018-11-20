const express = require('express');
const EndpointValidator = require('../../middleware/endpointValidator');
const asyncWrapper = require('../utils/asyncWrapper');
const {
  getDefaultRequestParams,
} = require('../utils/getRequestParams');

const endpointValidator = new EndpointValidator();
const router = express.Router({ mergeParams: true });


function init({ tweetService }) {
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
    const tweetsList = await tweetService.list(Object.assign(
      {},
      handlePagination({
        publisher: req.query.publisher,
        page: req.query.page ? parseInt(req.query.page, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit, 10) : 25,
      }),
      getDefaultRequestParams(req),
    ));
    return res.send({
      data: tweetsList,
    });
  }));

  router.post('/', endpointValidator.requireValidTweetBody, asyncWrapper(async (req, res) => {
    const newTweet = await tweetService.create(Object.assign(
      {
        imageUrl: req.body.imageUrl,
        text: req.body.text,
        publisher: req.body.publisher,
      },
      getDefaultRequestParams(req),
    ));
    return res.send({
      data: newTweet,
    });
  }));

  router.get('/:tweetId', endpointValidator.requireValidTweetId, asyncWrapper(async (req, res) => {
    const tweetDoc = await tweetService.get(Object.assign(
      {
        tweetId: req.params.tweetId,
      },
      getDefaultRequestParams(req),
    ));
    return res.send({
      data: tweetDoc,
    });
  }));

  return router;
}

module.exports.init = init;
