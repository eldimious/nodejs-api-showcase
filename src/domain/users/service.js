/*
  Here is the core of our application. Here we add our business logic.
  e.g. Lets say that every time that we ask for a user, we need his posts too.
  So we add this logic in domain layer.
*/
function init({
  usersRepository,
  postsRepository,
}) {
  async function getUser(options) {
    const [
      user,
      posts,
    ] = await Promise.all([
      usersRepository.getUser(options),
      postsRepository.listUserPosts(options),
    ]);
    return {
      user,
      posts,
    };
  }

  return {
    getUser,
  };
}

module.exports.init = init;
