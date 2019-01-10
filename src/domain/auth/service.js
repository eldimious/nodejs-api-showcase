// DOMAIN LAYER
// Has the authRepository as a dependency. The authService does not know
// nor does it care where the user models came from. This is abstracted away
// by the implementation of the repositories. It just calls the needed repositories
// gets the results and usually applies some business logic on them.
const jwt = require('jsonwebtoken');

function init({ authRepository }) {
  async function register(options) {
    return authRepository.register(options);
  }

  async function login(options) {
    return authRepository.login(options);
  }

  const verifyToken = async function verifyToken(token, jwtSecret) {
    return jwt.verify(token, jwtSecret);
  };

  return {
    register,
    login,
    verifyToken,
  };
}

module.exports = init;
