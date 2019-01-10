// DOMAIN LAYER
// Has the postRepository as a dependency. The PostService does not know
// nor does it care where the post models came from. This is abstracted away
// by the implementation of the repositories. It just calls the needed repositories
// gets the results and usually applies some business logic on them.
function init({
  postRepository,
}) {
  const list = async function list(options) {
    return postRepository.list(options);
  };

  const create = async function create(options) {
    return postRepository.create(options);
  };

  const get = async function get(options) {
    return postRepository.get(options);
  };

  return {
    list,
    create,
    get,
  };
}

module.exports = init;
