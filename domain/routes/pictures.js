const express = require('express');
const debug = require('debug')('routes-users');

const router = express.Router({ mergeParams: true });

function init({ pictureService }) {
  debug(' ---------- Init routes-DRIVERS --------- ');

  const getListOfUsers = (req, res, next) => {
    debug('get pictures list by user');
    return pictureService.getListByUser(req.params.user)
      .then(result => res.json({ picturesList: result }))
      .catch(error => next(error));
  };

  const addPicture = (req, res, next) => {
    debug('add new picture');
    const options = {
      imageUrl: req.body.imageUrl,
      postUrl: req.body.postUrl,
      postId: req.body.postId,
      network: req.body.network,
      user: req.params.user,
    };
    return pictureService.create(options)
      .then(result => res.json(result))
      .catch(error => next(error));
  };

  const getSpecificPictureById = (req, res, next) => {
    debug('get specific picture by id');
    const options = {
      id: req.params.id,
    };
    return pictureService.getByPictureId(options)
      .then(result => res.json(result))
      .catch(error => next(error));
  };

  const getSpecificPictureByNetwork = (req, res, next) => {
    debug('get specific picture by network');
    const options = {
      network: req.params.network,
    };
    return pictureService.getByNetwork(options)
      .then(result => res.json(result))
      .catch(error => next(error));
  };

  router.get('/:id', getSpecificPictureById);

  router.get('/user/:user', getListOfUsers);

  router.post('/user/:user', addPicture);

  router.get('/network/:network', getSpecificPictureByNetwork);

  return router;
}

module.exports.init = init;
