const postRepository = require('./post/repository');
const authRepository = require('./auth/repository');
const userRepository = require('./user/repository');

module.exports = db => ({
  authRepository: authRepository(db.entities),
  postRepository: postRepository(db.entities),
  userRepository: userRepository(db.entities),
});
