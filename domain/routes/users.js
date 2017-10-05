const express = require('express');
const debug = require('debug')('routes-users');

const router = express.Router({ mergeParams: true });

function init({ userService }) {
  debug(' ---------- Init routes-DRIVERS --------- ');

  const getListOfUsers = (req, res, next) => {
    debug('get users list');
    return userService.getList()
      .then(result => res.json({ usersList: result }))
      .catch(error => next(error));
  };

  const addUser = (req, res, next) => {
    debug('add new user');
    const options = {
      name: req.body.name,
      city: req.body.city,
      vehicle: req.body.vehicle,
    };
    return userService.create(options)
      .then(result => res.json(result))
      .catch(error => next(error));
  };

  const getUser = (req, res, next) => {
    debug('get specific user');
    const options = {
      id: req.params.id,
    };
    return userService.get(options)
      .then(result => res.json(result))
      .catch(error => next(error));
  };

  router.get('/', getListOfUsers);

  router.post('/', addUser);

  router.get('/:id', getUser);

  return router;
}

module.exports.init = init;
