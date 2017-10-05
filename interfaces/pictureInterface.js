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

  const getUsersList = () => {
    const promise = Picture.find({}).lean().exec();
    return promise
      .then(picturesList => picturesList.map(picture => Picture.toPictureModel(picture)))
      .catch(error => Promise.reject(error));
  };

  const createUser = (options) => {
    const pictureDocument = Picture({
      imageUrl: options.imageUrl,
      postUrl: options.postUrl,
      postId: options.postId,
      network: options.network,
      userID: options.userID,
    });
    const promise = pictureDocument.save();
    return promise
      .then(userDoc => userDoc)
      .catch(error => Promise.reject(error));
  };

  const getUser = (options) => {
    const promise = Picture.find({ name: options.id }).exec();
    return promise
      .then((usersList) => {
        const users = usersList.map(user => Picture.toUserModel(user));
        return users;
      })
      .catch(error => Promise.reject(error));
  };

  return {
    getList: getUsersList,
    create: createUser,
    get: getUser,
  };
}

module.exports.init = init;
