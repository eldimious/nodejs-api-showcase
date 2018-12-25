const tweetRepository = require('./tweet/repository');
const authRepository = require('./auth/repository');
const userRepository = require('./user/repository');

module.exports = db => ({
  authRepository: authRepository(db.entities),
  tweetRepository: tweetRepository(db.entities),
  userRepository: userRepository(db.entities),
});
