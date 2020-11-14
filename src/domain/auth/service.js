// DOMAIN LAYER
// Has the userRepository as a dependency. The authService does not know
// nor does it care where the user models came from. This is abstracted away
// by the implementation of the repositories. It just calls the needed repositories
// gets the results and usually applies some business logic on them.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  jwtSecret,
} = require('../../configuration');
const errors = require('../../common/errors');

// expiration in seconds
const TOKEN_EXPIRATION = 86400;

const comparePassword = async (password, dbPassword) => {
  try {
    const match = await bcrypt.compare(password, dbPassword);
    if (!match) {
      throw new Error('Authentication error');
    }
    return match;
  } catch (error) {
    throw new errors.Unauthorized('Wrong password.');
  }
};


function init({ userRepository }) {
  async function register(options) {
    return userRepository.create(options);
  }

  async function login(options) {
    try {
      const user = await userRepository.get(options);
      await comparePassword(options.password, user.password);
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
