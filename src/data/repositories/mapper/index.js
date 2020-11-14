const toDatabase = function toDatabase() {
  // TODO
};

const toDomainModel = function toDomainModel(databaseDoc, DomainModel) {
  return new DomainModel(databaseDoc);
};

module.exports = {
  toDatabase,
  toDomainModel,
};
