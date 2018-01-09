const express = require('express');
const debug = require('debug')('routes-users');
const EndpointValidator = require('../../middlewares/endpointValidator');

const endpointValidator = new EndpointValidator();
const router = express.Router({ mergeParams: true });


function init({ tweetService }) {
  debug(' ---------- Init routes-TWEETS --------- ');

  const DEFAULT_PAGINATION_LIMIT = 25;
  const MAX_PAGINATION_LIMIT = 100;
  const DEFAULT_PAGINATION_PAGE = 1;

  const _handlePaginationInOptions = (options) => {
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


  const getListOfTweets = (req, res, next) => {
    debug('get tweets list');
    let options = {
      userId: req.user._id,
      source: req.query.source,
      type: req.query.type,
      publisher: req.query.publisher,
      page: req.query.page ? parseInt(req.query.page, 10) : 1,
      limit: req.query.limit ? parseInt(req.query.limit, 10) : 25,
    };
    options = _handlePaginationInOptions(options);
    Object.keys(options).forEach(key => (!options[key]) && delete options[key]);
    return tweetService.getList(options)
      .then(result => res.jsend(result))
      .catch(error => next(error));
  };


  const addTweet = (req, res, next) => {
    debug('add new tweet');
    const options = {
      userId: req.user._id,
      url: req.body.url,
      source: req.body.source,
      type: req.body.type,
      publisher: req.body.publisher,
    };
    return tweetService.create(options)
      .then(result => res.jsend({ tweet: result }))
      .catch(error => next(error));
  };


  const getTweet = (req, res, next) => {
    debug('get specific tweet');
    const options = {
      id: req.params.id,
    };
    return tweetService.get(options)
      .then(result => res.jsend({ tweet: result }))
      .catch(error => next(error));
  };


  router.get('/', getListOfTweets);

  router.post('/', addTweet);

  router.get('/:id', endpointValidator.requireValidUserId, getTweet);

  return router;
}

module.exports.init = init;
