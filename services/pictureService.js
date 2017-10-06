// DOMAIN LAYER
// Has the pictureInterface as a dependency. The DriverService does not know
// nor does it care where the user models came from. This is abstracted away
// by the implementation of the interfaces. It just calls the needed interfaces
// gets the results and usually applies some business logic on them.

const debug = require('debug')('services:PICTURE');


function init({ pictureInterface }) {
  debug('------- INIT SERVICES:PICTURE ---------');

  const getPicturesListByUser = (user) => {
    debug('getDriversList called');
    return pictureInterface.getListByUser(user)
      .then(drivers => drivers)
      .catch(error => Promise.reject(error));
  };

  const createPicture = (options) => {
    debug('createDriver called');
    return pictureInterface.create(options)
      .then(driver => driver)
      .catch(error => Promise.reject(error));
  };

  const getSpecificPictureById = (options) => {
    debug('createDriver called');
    return pictureInterface.getByPictureId(options)
      .then(driver => driver)
      .catch(error => Promise.reject(error));
  };

  const getSpecificPictureByNetwork = (options) => {
    debug('createDriver called');
    return pictureInterface.getByNetwork(options.network)
      .then(driver => driver)
      .catch(error => Promise.reject(error));
  };


  return {
    getListByUser: getPicturesListByUser,
    create: createPicture,
    getByPictureId: getSpecificPictureById,
    getByNetwork: getSpecificPictureByNetwork,
  };
}

module.exports.init = init;
