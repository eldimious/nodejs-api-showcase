// DATA LAYER
// authInterface:
// is used to provide an abstraction on top of the database ( and possible other data sources)
// so other parts of the application are decoupled from the specific database implementation.
// Furthermore it can hide the origin of the data from it's consumers.
// It is possible to fetch the entities from different sources like inmemory cache, 
// network or the db without the need to alter the consumers code.

const debug = require('debug')('interfaces:AUTH');
const errors = require('../common/errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configuration');

function init({ User }) {
  debug('------- INIT INTERFACES:AUTH ---------');


  const register = (options) => {
    debug('register new user', options);
    let newUser = new User({
      name: options.name,
      surname: options.surname,
      email: options.email,
      password: options.password,
    });
    return newUser.save()
      .then(userDoc => User.toUserModel(userDoc))
      .catch(error => Promise.reject(error));
  };


  const login = (options) => {
    debug('login', options);
    let userDoc;
    return User.findOne({ email: options.email }).exec()
      .then((userDB) => {
        if (!userDB) {
          return Promise.reject(new errors.unauthorized(`UserDoc with email: ${options.email} not found.`));
        }
        userDoc = User.toUserModel(userDB);
        return User.comparePassword(options.password, userDB.password);
      })
      .then((isMatch) => {
        if (!isMatch) {
          return Promise.reject(new errors.unauthorized('Wrong password.'));
        }
        return {
          token: jwt.sign({ email: userDoc.email, fullName: userDoc.fullName, _id: userDoc.id }, jwtSecret, { expiresIn: 86400 }),
          user: userDoc,
        };
      })
      .catch(error => errors.genericErrorHandler(error, 'Internal error in login func in authInterface.'));
  };


  return {
    login,
    register,
  };
}

module.exports.init = init;
