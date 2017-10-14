// DATA LAYER
// userInterface:
// is used to provide an abstraction on top of the database ( and possible other data sources)
// so other parts of the application are decoupled from the specific database implementation.
// Furthermore it can hide the origin of the data from it's consumers.
// It is possible to fetch the entities from different sources like inmemory cache, 
// network or the db without the need to alter the consumers code.

const debug = require('debug')('interfaces:USER');

function init({ User }) {
  debug('------- INIT INTERFACES:USER ---------');

  const getList = () => User.find({}).lean().exec()
    .then(usersList => usersList.map(user => User.toUserModel(user)))
    .catch(error => Promise.reject(error));


  const createUser = (options) => {
    const userDocument = User({
      name: options.name,
      email: options.email,
    });
    return userDocument.save()
      .then(userDoc => userDoc)
      .catch(error => Promise.reject(error));
  };

  const getUser = options => User.findById(options.id).exec()
    .then(user => User.toUserModel(user))
    .catch(error => Promise.reject(error));


  return {
    getList,
    create: createUser,
    get: getUser,
  };
}

module.exports.init = init;
