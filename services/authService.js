// DOMAIN LAYER
// Has the authInterface as a dependency. The authService does not know
// nor does it care where the user models came from. This is abstracted away
// by the implementation of the interfaces. It just calls the needed interfaces
// gets the results and usually applies some business logic on them.

function init({ authInterface }) {
  async function register(options) {
    return authInterface.register(options);
  }

  async function login(options) {
    console.log('111111', options)
    return authInterface.login(options);
  }

  return {
    register,
    login,
  };
}

module.exports = init;
