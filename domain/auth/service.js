// DOMAIN LAYER
// Has the userRepository as a dependency. The authService does not know
// nor does it care where the user models came from. This is abstracted away
// by the implementation of the repositories. It just calls the needed repositories
// gets the results and usually applies some business logic on them.

const jwt = require('jsonwebtoken');
const {
  jwtSecret,
} = require('../../configuration');

const TOKEN_EXPIRATION = 86400;


function init({ userRepository }) {
  async function register(options) {
    return userRepository.create(options);
  }

  async function login(options) {
    try {
      const user = await userRepository.authenticate(options);
      return {
        token: {
          id: jwt.sign({ email: user.email, fullName: user.fullName, _id: user.id }, jwtSecret, { expiresIn: TOKEN_EXPIRATION }),
          expiresIn: TOKEN_EXPIRATION,
        },
        user,
      };
    } catch (error) {
      throw error;
    }
  }

  const verifyToken = async function verifyToken(token) {
    return jwt.verify(token, jwtSecret);
  };

  return {
    register,
    login,
    verifyToken,
  };
}

module.exports = init;
