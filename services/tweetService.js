// DOMAIN LAYER
// Has the tweetInterface as a dependency. The TweetService does not know
// nor does it care where the tweet models came from. This is abstracted away
// by the implementation of the interfaces. It just calls the needed interfaces
// gets the results and usually applies some business logic on them.
// I am using a factory function (using object literal and prototype) to pass methods on prototype chain
// With factory functions(closures) we can have data privacy.
// I am not using just closures like on authService/authInterface in order to pass methods on prototype chain

function init({
  tweetInterface,
}) {
  const list = async function list(options) {
    return tweetInterface.list(options);
  };

  const create = async function create(options) {
    return tweetInterface.create(options);
  };

  const get = async function get(options) {
    return tweetInterface.get(options);
  };

  return {
    list,
    create,
    get,
  };
}

module.exports = init;
