'use strict';

const express = require('express');
const debug = require('debug')('routes-users');
const { tokens } = require('../../configuration');
const EndpointValidator = require('../../middlewares/endpointValidator');

const endpointValidator = new EndpointValidator();
const router = express.Router({ mergeParams: true });

function init({ socialNetworkService }) {
  debug(' ---------- Init routes-NETWORKS --------- ');

  const DEFAULT_POSTS_LIMIT_PER_NETWORK = {
    instagram: 33,
    twitter: 200,
    tumblr: 50,
    facebook: 100,
  };


  const getNetworkMedia = (req, res, next) => {
    debug('get social network media');
    if (!req.query.userId && !req.query.hashtag) {
      return res.status(403).send({ status: 'Should send userId or hashtag as query param.' });
    }
    const options = {
      type: req.params.type,
      network: req.params.network,
      token: tokens[req.params.network],
      hashtag: req.query.hashtag,
      userId: req.query.userId,
      nextMaxId: req.query.nextMaxId,
      count: DEFAULT_POSTS_LIMIT_PER_NETWORK[req.params.network],
    };
    return socialNetworkService[options.network].getMedia(options)
      .then(result => res.json({ mediaList: result }))
      .catch(error => next(error));
  };


  /**
    * Get media from a network depend on tag
  */
  router.get('/:network/:type/media', endpointValidator.requireValidNetwork, endpointValidator.requireValidType, getNetworkMedia);


  return router;
}

module.exports.init = init;
