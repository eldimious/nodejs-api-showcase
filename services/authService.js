// DOMAIN LAYER
// Has the authInterface as a dependency. The authService does not know
// nor does it care where the user models came from. This is abstracted away
// by the implementation of the interfaces. It just calls the needed interfaces
// gets the results and usually applies some business logic on them.

const debug = require('debug')('services:AUTH');


function init({ authInterface }) {
  debug('------- INIT SERVICES:AUTH ---------');

  async function register(options) {
    debug('register func called', options);
    const userDoc = await authInterface.register(options);
    return userDoc;
  }

  async function login(options) {
    debug('login func called', options);
    const userDoc = await authInterface.login(options);
    return userDoc;
  }

  return {
    register,
    login,
  };
}

module.exports.init = init;
