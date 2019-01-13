const postStore = require('./postStore');
const userStore = require('./userStore');


module.exports.create = schemas => ({
  postStore: postStore.create(schemas),
  userStore: userStore.create(schemas),
});
