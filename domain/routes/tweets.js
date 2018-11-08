const express = require('express');
const debug = require('debug')('routes-users');
const EndpointValidator = require('../../middleware/endpointValidator');
const asyncWrapper = require('../utils/asyncWrapper');

const endpointValidator = new EndpointValidator();
const router = express.Router({ mergeParams: true });


function init({ tweetService }) {
  debug(' ---------- Init routes-TWEETS --------- ');

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
    const tweetsList = await tweetService.getList(Object.assign(
      {}, 
      handlePagination({
        userId: req.user._id,
        source: req.query.source,
        type: req.query.type,
        publisher: req.query.publisher,
        page: req.query.page ? parseInt(req.query.page, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit, 10) : 25,
      }),
    ));
    return res.jsend(tweetsList);
  }));

  router.post('/', asyncWrapper(async (req, res) => {
    const newTweet = await tweetService.create({
      userId: req.user._id,
      url: req.body.url,
      source: req.body.source,
      type: req.body.type,
      publisher: req.body.publisher,
    });
    return res.jsend({ tweet: newTweet });
  }));

  router.get('/:tweetId', endpointValidator.requireValidTweetId, asyncWrapper(async (req, res) => {
    const tweetDoc = await tweetService.get({
      userId: req.user._id,
      tweetId: req.params.tweetId,
    });
    return res.jsend({ tweet: tweetDoc });
  }));

  return router;
}

module.exports.init = init;
