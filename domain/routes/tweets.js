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


  async function getListOfTweets(req, res, next) {
    debug('get tweets list');
    const options = {
      userId: req.user._id,
      source: req.query.source,
      type: req.query.type,
      publisher: req.query.publisher,
      page: req.query.page ? parseInt(req.query.page, 10) : 1,
      limit: req.query.limit ? parseInt(req.query.limit, 10) : 25,
    };
    const queryOptions = Object.assign({}, handlePagination(options));
    const tweetsList = await tweetService.getList(queryOptions);
    return res.jsend(tweetsList);
  }


  async function addTweet(req, res, next) {
    debug('add new tweet');
    const options = {
      userId: req.user._id,
      url: req.body.url,
      source: req.body.source,
      type: req.body.type,
      publisher: req.body.publisher,
    };
    const newTweet = await tweetService.create(options);
    return res.jsend({ tweet: newTweet });
  }


  async function getTweet(req, res, next) {
    debug('get specific tweet');
    const options = {
      userId: req.user._id,
      tweetId: req.params.tweetId,
    };
    const tweetDoc = await tweetService.get(options);
    return res.jsend({ tweet: tweetDoc });
  }


  router.get('/', asyncWrapper(getListOfTweets));

  router.post('/', asyncWrapper(addTweet));

  router.get('/:tweetId', endpointValidator.requireValidTweetId, asyncWrapper(getTweet));

  return router;
}

module.exports.init = init;
