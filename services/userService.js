// DOMAIN LAYER
// Has the userInterface as a dependency. The DriverService does not know
// nor does it care where the user models came from. This is abstracted away
// by the implementation of the interfaces. It just calls the needed interfaces
// gets the results and usually applies some business logic on them.

const debug = require('debug')('services:USER');


function init({ userInterface }) {
  debug('------- INIT SERVICES:USER ---------');

  const findProperGetListFunction = (options) => {
    debug('findProperGetUserFunction called', options);
    const queryParams = Object.keys(options);
    console.log('queryParams length', queryParams.length);
    if (queryParams.length > 3) {
      return userInterface.getListGenericQuery(options);
    } else if (options.name) {
      return userInterface.getListByName(options);
    } else if (options.email) {
      return userInterface.getListByEmail(options);
    }
    return userInterface.getList(options);
  };

  const getUsersList = (options) => {
    debug('getDriversList called');
    return findProperGetListFunction(options)
      .then(userList => userList)
      .catch(error => Promise.reject(error));
  };

  const createUser = (options) => {
    debug('createDriver called');
    return userInterface.create(options)
      .then(user => user)
      .catch(error => Promise.reject(error));
  };

  const getUser = (options) => {
    debug('createDriver called');
    return userInterface.get(options)
      .then(user => user)
      .catch(error => Promise.reject(error));
  };


  return {
    getList: getUsersList,
    create: createUser,
    get: getUser,
  };
}

module.exports.init = init;
