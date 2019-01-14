const postRepository = require('./posts/repository');
const userRepository = require('./users/repository');


module.exports = db => ({
  postRepository: postRepository({
    schemas: db.schemas,
    stores: db.dataStores,
  }),
  userRepository: userRepository({
    schemas: db.schemas,
    stores: db.dataStores,
  }),
});
