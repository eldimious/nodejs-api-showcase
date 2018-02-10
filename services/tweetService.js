// DOMAIN LAYER
// Has the tweetInterface as a dependency. The TweetService does not know
// nor does it care where the tweet models came from. This is abstracted away
// by the implementation of the interfaces. It just calls the needed interfaces
// gets the results and usually applies some business logic on them.

// I am using factory function using object literal and prototype to pass methods on prototype chain
// With factory functions(closures) we can have data privacy.
// I am not using just closures like on authService/authInterface in order to pass methods on prototype chain
// (factory fuctions is an alternative way to prototypes without the need to use new keyword)
// The main difference of just using closures and using closure with object literal and prototype is that
// with second way we pass methods to prototype chain. Returns an empty object instead of an object with functions

const debug = require('debug')('services:TWEET');

const tweetServiceProto = {
  async getList(options) {
    debug('getList called');
    const tweetsList = await this.tweetInterface.getList(options);
    return tweetsList;
  },

  async createTweet(options) {
    debug('createTweet called');
    const tweetDoc = await this.tweetInterface.create(options);
    return tweetDoc;
  },

  async getTweet(options) {
    debug('getTweet called');
    const tweetDoc = await this.tweetInterface.get(options);
    return tweetDoc;
  },
};

function init({ tweetInterface }) {
  return Object.assign(Object.create(tweetServiceProto), { tweetInterface });
}

// function init({ tweetInterface }) {
//   debug('------- INIT SERVICES:TWEET ---------');

//   const getList = async (options) => {
//     debug('getList called');
//     const tweetsList = await tweetInterface.getList(options);
//     return tweetsList;
//   };

//   const createTweet = async (options) => {
//     debug('createTweet called');
//     const tweetDoc = await tweetInterface.create(options);
//     return tweetDoc;
//   };

//   const getTweet = async (options) => {
//     debug('getTweet called');
//     const tweetDoc = await tweetInterface.get(options);
//     return tweetDoc;
//   };


//   return Object.create({
//     getList,
//     create: createTweet,
//     get: getTweet,
//   });
// }
module.exports.init = init;
