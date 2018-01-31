// DOMAIN LAYER
// Has the tweetInterface as a dependency. The TweetService does not know
// nor does it care where the tweet models came from. This is abstracted away
// by the implementation of the interfaces. It just calls the needed interfaces
// gets the results and usually applies some business logic on them.

const debug = require('debug')('services:TWEET');


function init({ tweetInterface }) {
  debug('------- INIT SERVICES:TWEET ---------');

  const getList = async (options) => {
    debug('getList called');
    const tweetsList = await tweetInterface.getList(options);
    return tweetsList;
  };

  const createTweet = async (options) => {
    debug('createTweet called');
    const tweetDoc = await tweetInterface.create(options);
    return tweetDoc;
  };

  const getTweet = async (options) => {
    debug('getTweet called');
    const tweetDoc = await tweetInterface.get(options);
    return tweetDoc;
  };


  return {
    getList,
    create: createTweet,
    get: getTweet,
  };
}

module.exports.init = init;
