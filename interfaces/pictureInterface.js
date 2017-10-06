// DATA LAYER
// PICTUREInterface:
// is used to provide an abstraction on top of the database ( and possible other data sources)
// so other parts of the application are decoupled from the specific database implementation.
// Furthermore it can hide the origin of the data from it's consumers.
// It is possible to fetch the entities from different sources like inmemory cache, 
// network or the db without the need to alter the consumers code.

const debug = require('debug')('interfaces:PICTURE');
const PictureModel = require('../models/Picture');

function init({ Picture }) {
  debug('------- INIT INTERFACES:PICTURE ---------');

  const getPicturesListByUser = (user) => {
    const promise = Picture.find({ user }).lean().populate('user', 'name email _id').exec();
    return promise
      .then(picturesList => picturesList.map(picture => Picture.toPictureModel(picture)))
      .catch(error => Promise.reject(error));
  };

  const createPicture = (options) => {
    const pictureDocument = Picture({
      imageUrl: options.imageUrl,
      postUrl: options.postUrl,
      postId: options.postId,
      network: options.network,
      user: options.user,
    });
    const promise = pictureDocument.save();
    return promise
      .then(userDoc => userDoc)
      .catch(error => Promise.reject(error));
  };

  const getSpecificPictureById = (options) => {
    const promise = Picture.findById(options.id).exec();
    return promise
      .then(picture => Picture.toPictureModel(picture))
      .catch(error => Promise.reject(error));
  };

  return {
    getListByUser: getPicturesListByUser,
    create: createPicture,
    getByPictureId: getSpecificPictureById,
  };
}

module.exports.init = init;
