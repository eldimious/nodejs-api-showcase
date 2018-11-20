// DOMAIN LAYER
// Has the tweetRepository as a dependency. The TweetService does not know
// nor does it care where the tweet models came from. This is abstracted away
// by the implementation of the repositories. It just calls the needed repositories
// gets the results and usually applies some business logic on them.

function init({
  tweetRepository,
}) {
  const list = async function list(options) {
    return tweetRepository.list(options);
  };

  const create = async function create(options) {
    return tweetRepository.create(options);
  };

  const get = async function get(options) {
    return tweetRepository.get(options);
  };

  return {
    list,
    create,
    get,
  };
}

module.exports = init;
