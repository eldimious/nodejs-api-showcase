/*
  Here is the core of our application. Here we add our business logic.
  e.g. Lets say that every time that we ask for a user, we need his posts too.
  So we add this logic in domain layer.
*/
function init({ userRepository, postRepository }) {
  async function get(options) {
    const [
      user,
      posts,
    ] = await Promise.all([
      userRepository.get(options),
      postRepository.list(options),
    ]);
    return {
      user,
      posts,
    };
  }

  return {
    get,
  };
}

module.exports = init;
