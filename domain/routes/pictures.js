const express = require('express');
const debug = require('debug')('routes-users');

const router = express.Router({ mergeParams: true });

function init({ pictureService }) {
  debug(' ---------- Init routes-DRIVERS --------- ');

  const getListOfPictures = (req, res, next) => {
    debug('get list based on query options');
    const options = {
      user: req.query.user,
      network: req.query.network,
    };
    return pictureService.getList(options)
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
    console.log("addPicture", options)
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


  router.get('/', getListOfPictures);

  router.get('/:id', getSpecificPictureById);

  router.post('/user/:user', addPicture);


  return router;
}

module.exports.init = init;
