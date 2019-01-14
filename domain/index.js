// Register all the services here
const postService = require('./posts/service');
const authService = require('./auth/service');
const userService = require('./users/service');

module.exports = repositories => ({
  authService: authService(repositories),
  postService: postService(repositories),
  userService: userService(repositories),
});
