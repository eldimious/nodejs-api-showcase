// Register all the services here
const postService = require('./post/service');
const authService = require('./auth/service');
const userService = require('./user/service');

module.exports = repositories => ({
  authService: authService(repositories),
  postService: postService(repositories),
  userService: userService(repositories),
});
