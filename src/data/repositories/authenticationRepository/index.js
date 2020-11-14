const util = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mapper = require('../../mapper');
const logging = require('../../../common/logging');
const {
  USER_TOKEN_EXPIRATION,
  USER_ROLE,
} = require('../../../common/constants');
const {
  jwtSecret,
} = require('../../../configuration');
const DomainToken = require('../../../domain/token/model');
const errors = require('../../../common/errors');

const SALT_ROUNDS = 10;
const genSalt = util.promisify(bcrypt.genSalt);
const hash = util.promisify(bcrypt.hash);

module.exports.init = function init() {
  async function comparePassword(password, dbPassword) {
    try {
      const match = await bcrypt.compare(password, dbPassword);
      if (!match) {
        throw new Error('Authentication error');
      }
      return match;
    } catch (error) {
      throw new errors.Unauthorized('Wrong password.');
    }
  }

  async function hashPassword(password) {
    const salt = await genSalt(SALT_ROUNDS);
    return hash(password, salt);
  }

  async function createUserToken(user) {
    logging.info('Create consultant token called');
    const token = {
      accessToken: jwt.sign({
        email: user.email,
        fullName: user.fullName,
        _id: user.id,
        roles: [USER_ROLE],
      }, jwtSecret, {
        expiresIn: USER_TOKEN_EXPIRATION,
      }),
      tokenType: 'Bearer',
      roles: [USER_ROLE],
      expiresIn: USER_TOKEN_EXPIRATION,
    };
    return mapper.toDomainModel(token, DomainToken);
  }

  async function verifyToken(token, secret) {
    return jwt.verify(token, secret);
  }

  function verifyTokenSync(token, secret) {
    return jwt.verify(token, secret);
  }

  return {
    createUserToken,
    verifyToken,
    verifyTokenSync,
    comparePassword,
    hashPassword,
  };
};
