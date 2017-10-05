const express = require('express');
const debug = require('debug')('routes-users');

const router = express.Router({ mergeParams: true });

function init({ pictureService }) {
  debug(' ---------- Init routes-DRIVERS --------- ');

  const getListOfUsers = (req, res, next) => {
    debug('get users list');
    return pictureService.getList()
      .then(result => res.json({ usersList: result }))
      .catch(error => next(error));
  };

  const addPicture = (req, res, next) => {
    debug('add new user');
    const options = {
      imageUrl: req.body.imageUrl,
      postUrl: req.body.postUrl,
      postId: req.body.postId,
      network: req.body.network,
      userID: req.params.userID,
    };
    return pictureService.create(options)
      .then(result => res.json(result))
      .catch(error => next(error));
  };

  const getUser = (req, res, next) => {
    debug('get specific user');
    const options = {
      id: req.params.id,
    };
    return pictureService.get(options)
      .then(result => res.json(result))
      .catch(error => next(error));
  };

  router.get('/', getListOfUsers);

  router.post('/:userID', addPicture);

  router.get('/:id', getUser);

  return router;
}

module.exports.init = init;
