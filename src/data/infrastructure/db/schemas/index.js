const { PostDao } = require('./Post');
const { UserDao } = require('./User');

module.exports.create = () => ({
  Post: PostDao,
  User: UserDao,
});
