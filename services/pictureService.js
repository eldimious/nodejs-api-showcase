// DOMAIN LAYER
// Has the pictureInterface as a dependency. The DriverService does not know
// nor does it care where the user models came from. This is abstracted away
// by the implementation of the interfaces. It just calls the needed interfaces
// gets the results and usually applies some business logic on them.

const debug = require('debug')('services:PICTURE');


function init({ pictureInterface }) {
  debug('------- INIT SERVICES:PICTURE ---------');

  const getUsersList = () => {
    debug('getDriversList called');
    return pictureInterface.getList()
      .then(drivers => drivers)
      .catch(error => Promise.reject(error));
  };

  const createPicture = (options) => {
    debug('createDriver called');
    return pictureInterface.create(options)
      .then(driver => driver)
      .catch(error => Promise.reject(error));
  };

  const getUser = (options) => {
    debug('createDriver called');
    return pictureInterface.get(options)
      .then(driver => driver)
      .catch(error => Promise.reject(error));
  };


  return {
    getList: getUsersList,
    create: createPicture,
    get: getUser,
  };
}

module.exports.init = init;
