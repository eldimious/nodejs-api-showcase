// DATA LAYER
// authInterface:
// is used to provide an abstraction on top of the database ( and possible other data sources)
// so other parts of the application are decoupled from the specific database implementation.
// Furthermore it can hide the origin of the data from it's consumers.
// It is possible to fetch the entities from different sources like inmemory cache,
// network or the db without the need to alter the consumers code.

const debug = require('debug')('interfaces:AUTH');
const errors = require('../common/errors');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configuration');

function init({ User }) {
  debug('------- INIT INTERFACES:AUTH ---------');

  const mapperToUserModel = userDoc => User.toUserModel({
    _id: userDoc._id,
    name: userDoc.name,
    surname: userDoc.surname,
    email: userDoc.email,
    created: userDoc.created,
  });


  async function register(options) {
    debug('register new user', options);
    const newUser = new User({
      name: options.name,
      surname: options.surname,
      email: options.email,
      password: options.password,
    });
    try {
      const userDoc = await newUser.save();
      return mapperToUserModel(userDoc);
    } catch (error) {
      throw error;
    }
  }


  async function login(options) {
    debug('login', options);
    try {
      const userDBDoc = await User.findOne({ email: options.email }).exec();
      if (!userDBDoc) {
        throw new errors.Unauthorized(`UserDoc with email: ${options.email} not found.`);
      }
      const userDoc = mapperToUserModel(userDBDoc);
      const userPass = await User.comparePassword(options.password, userDBDoc.password);
      if (!userPass) {
        throw new errors.Unauthorized('Wrong password.');
      }
      return {
        token: jwt.sign({ email: userDoc.email, fullName: userDoc.fullName, _id: userDoc.id }, jwtSecret, { expiresIn: 86400 }),
        user: userDoc,
      };
    } catch (error) {
      throw error;
    }
  }


  return {
    login,
    register,
  };
}

module.exports.init = init;
