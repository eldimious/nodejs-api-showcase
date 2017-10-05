// DATA LAYER
// driverInterface:
// is used to provide an abstraction on top of the database ( and possible other data sources)
// so other parts of the application are decoupled from the specific database implementation.
// Furthermore it can hide the origin of the data from it's consumers.
// It is possible to fetch the entities from different sources like inmemory cache, 
// network or the db without the need to alter the consumers code.

const debug = require('debug')('interfaces:driver');
const UserModel = require('../models/User');

function init({ User }) {
  debug('------- INIT INTERFACES:DRIVER ---------');

  const getUsersList = () => {
    const promise = User.find({}).lean().exec();
    return promise
      .then(usersList => usersList.map(driver => new UserModel(driver.name, driver.city, driver.vehicle)))
      .catch(error => Promise.reject(error));
  };

  const createUser = (options) => {
    const userDocument = User({
      name: options.name,
      city: options.city,
      vehicle: options.vehicle,
    });
    const promise = userDocument.save();
    return promise
      .then(userDoc => userDoc)
      .catch(error => Promise.reject(error));
  };

  const getUser = (options) => {
    const promise = User.findOne({ name: options.id }).lean().exec();
    return promise
      .then(driver => new UserModel(driver.name, driver.city, driver.vehicle))
      .catch(error => Promise.reject(error));
  };

  return {
    getList: getUsersList,
    create: createUser,
    get: getUser,
  };
}

module.exports.init = init;
