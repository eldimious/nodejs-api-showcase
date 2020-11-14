// DOMAIN LAYER
// Has the postRepository as a dependency. The PostService does not know
// nor does it care where the post models came from. This is abstracted away
// by the implementation of the repositories. It just calls the needed repositories
// gets the results and usually applies some business logic on them.
function init({
  postsRepository,
}) {
  async function listUserPosts({
    userId,
    publisher,
    limit,
    page,
  }) {
    return postsRepository.listUserPosts({
      userId,
      publisher,
      limit,
      page,
    });
  }

  async function createUserPost({
    userId,
    imageUrl,
    description,
    publisher,
  }) {
    return postsRepository.createUserPost({
      userId,
      imageUrl,
      description,
      publisher,
    });
  }

  async function getUserPost({
    userId,
    postId,
  }) {
    return postsRepository.getUserPost({
      userId,
      postId,
    });
  }

  return {
    listUserPosts,
    createUserPost,
    getUserPost,
  };
}

module.exports.init = init;
