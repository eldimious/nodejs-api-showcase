// DOMAIN LAYER
// Has the tweetInterface as a dependency. The TweetService does not know
// nor does it care where the tweet models came from. This is abstracted away
// by the implementation of the interfaces. It just calls the needed interfaces
// gets the results and usually applies some business logic on them.
// I am using a factory function (using object literal and prototype) to pass methods on prototype chain
// With factory functions(closures) we can have data privacy.
// I am not using just closures like on authService/authInterface in order to pass methods on prototype chain


const debug = require('debug')('services:TWEET');

const tweetServiceProto = {
  async getList(options) {
    debug('getList called');
    const tweetsList = await this.tweetInterface.getList(options);
    return tweetsList;
  },

  async create(options) {
    debug('createTweet called');
    const tweetDoc = await this.tweetInterface.create(options);
    return tweetDoc;
  },

  async get(options) {
    debug('getTweet called');
    const tweetDoc = await this.tweetInterface.get(options);
    return tweetDoc;
  },
};

function init({ tweetInterface }) {
  return Object.assign(Object.create(tweetServiceProto), { tweetInterface });
}

module.exports.init = init;
