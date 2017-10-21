const express = require('express');
const debug = require('debug')('routes-users');

const router = express.Router({ mergeParams: true });

function init({ userService }) {
  debug(' ---------- Init routes-DRIVERS --------- ');

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


  const getListOfUsers = (req, res, next) => {
    debug('get users list');
    let options = {
      name: req.query.name,
      email: req.query.email,
      page: req.query.page ? parseInt(req.query.page, 10) : 1,
      limit: req.query.limit ? parseInt(req.query.limit, 10) : 25,
    };
    options = _handlePaginationInOptions(options);
    Object.keys(options).forEach(key => (!options[key]) && delete options[key]);
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
