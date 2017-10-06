// DOMAIN LAYER
// Has the pictureInterface as a dependency. The DriverService does not know
// nor does it care where the user models came from. This is abstracted away
// by the implementation of the interfaces. It just calls the needed interfaces
// gets the results and usually applies some business logic on them.

const debug = require('debug')('services:PICTURE');


function init({ pictureInterface }) {
  debug('------- INIT SERVICES:PICTURE ---------');

  const findQueryForPicturesList = (options) => {
    if (options.network && options.user) {
      return pictureInterface.getListByUserAndNetwork(options.user, options.network);
    } else if (options.network) {
      return pictureInterface.getListByNetwork(options.network);
    } else if (options.user) {
      return pictureInterface.getListByUser(options.user);
    }
    return pictureInterface.getList();
  };


  const getPicturesList = (options) => {
    debug('getPicturesList called', options);
    return findQueryForPicturesList(options)
      .then(drivers => drivers)
      .catch(error => Promise.reject(error));
  };

  const createPicture = (options) => {
    debug('createPicture called', options);
    return pictureInterface.create(options)
      .then(driver => driver)
      .catch(error => Promise.reject(error));
  };

  const getSpecificPictureById = (options) => {
    debug('getSpecificPictureById called');
    return pictureInterface.getByPictureId(options)
      .then(driver => driver)
      .catch(error => Promise.reject(error));
  };


  return {
    getList: getPicturesList,
    create: createPicture,
    getByPictureId: getSpecificPictureById,
  };
}

module.exports.init = init;
