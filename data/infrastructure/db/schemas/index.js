const postSchema = require('./Post');
const userSchema = require('./User');


module.exports.create = mongoose => ({
  Post: postSchema(mongoose),
  User: userSchema(mongoose),
});
