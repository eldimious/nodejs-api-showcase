const UserModel = require('../../../domain/user/model');

const toDatabase = function toDatabase(doc) {
  // TODO
};

const toDomainModel = function toDomainModel(userDoc) {
  return new UserModel({ ...userDoc });
};

module.exports = {
  toDatabase,
  toDomainModel,
};
