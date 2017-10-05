// DOMAIN LAYER
// Has the driverInterface as a dependency. The DriverService does not know
// nor does it care where the user models came from. This is abstracted away
// by the implementation of the interfaces. It just calls the needed interfaces
// gets the results and usually applies some business logic on them.

const debug = require('debug')('services:driver');


function init(driverInterface) {
  debug('------- INIT SERVICES:DRIVER ---------');

  const getDriversList = () => {
    debug('getDriversList called');
    return driverInterface.getList()
      .then(drivers => drivers)
      .catch(error => Promise.reject(error));
  };

  const createDriver = (options) => {
    debug('createDriver called');
    return driverInterface.create(options)
      .then(driver => driver)
      .catch(error => Promise.reject(error));
  };

  const getDriver = (options) => {
    debug('createDriver called');
    return driverInterface.get(options)
      .then(driver => driver)
      .catch(error => Promise.reject(error));
  };


  return {
    getList: getDriversList,
    create: createDriver,
    get: getDriver,
  };
}

module.exports.init = init;
