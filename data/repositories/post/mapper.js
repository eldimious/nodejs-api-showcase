const PostModel = require('../../../domain/post/model');

const toDatabase = function toDatabase(doc) {
  // TODO
};

const toDomainModel = function toDomainModel(postDoc) {
  return new PostModel({ ...postDoc });
};

module.exports = {
  toDatabase,
  toDomainModel,
};
