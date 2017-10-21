const express = require('express');
const debug = require('debug')('routes-users');

const router = express.Router({ mergeParams: true });

function init({ userService }) {
  debug(' ---------- Init routes-DRIVERS --------- ');

  const DEFAULT_PAGINATION_LIMIT = 25;
  const MAX_PAGINATION_LIMIT = 100;
  const DEFAULT_PAGINATION_PAGE = 1;

  const getListOfUsers = (req, res, next) => {
    debug('get users list');
    const options = {
      name: req.query.name,
      page: req.query.page ? parseInt(req.query.page, 10) : 1,
      limit: req.query.limit ? parseInt(req.query.limit, 10) : 25,
    };
    if (isNaN(options.limit)) {
      options.limit = DEFAULT_PAGINATION_LIMIT;
    }
    if (isNaN(options.page)) {
      options.page = DEFAULT_PAGINATION_PAGE;
    }
    if (options.limit > MAX_PAGINATION_LIMIT) {
      options.limit = MAX_PAGINATION_LIMIT;
    }
    return userService.getList(options)
      .then(result => res.jsend(result))
      .catch(error => next(error));
  };

  const addUser = (req, res, next) => {
    debug('add new user');
    const options = {
      name: req.body.name,
      email: req.body.email,
    };
    return userService.create(options)
      .then(result => res.jsend({ user: result }))
      .catch(error => next(error));
  };

  const getUser = (req, res, next) => {
    debug('get specific user');
    const options = {
      id: req.params.id,
    };
    return userService.get(options)
      .then(result => res.jsend({ user: result }))
      .catch(error => next(error));
  };

  router.get('/', getListOfUsers);

  router.post('/', addUser);

  router.get('/:id', getUser);

  return router;
}

module.exports.init = init;
