const tweetRepository = require('./tweetRepository');
const authRepository = require('./authRepository');
const userRepository = require('./userRepository');

module.exports = db => ({
  authRepository: authRepository(db.entities),
  tweetRepository: tweetRepository(db.entities),
  userRepository: userRepository(db.entities),
});
