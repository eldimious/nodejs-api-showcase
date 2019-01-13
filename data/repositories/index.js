const postRepository = require('./post/repository');
const userRepository = require('./user/repository');


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
