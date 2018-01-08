// DOMAIN LAYER
// Has the userInterface as a dependency. The UserService does not know
// nor does it care where the user models came from. This is abstracted away
// by the implementation of the interfaces. It just calls the needed interfaces
// gets the results and usually applies some business logic on them.

const debug = require('debug')('services:USER');


function init({ tweetInterface }) {
  debug('------- INIT SERVICES:USER ---------');

  const getTweetsList = (options) => {
    debug('getDriversList called');
    return tweetInterface.getList(options)
      .then(tweetsList => tweetsList)
      .catch(error => Promise.reject(error));
  };

  const createTweet = (options) => {
    debug('createTweet called');
    return tweetInterface.create(options)
      .then(tweet => tweet)
      .catch(error => Promise.reject(error));
  };

  const getTweet = (options) => {
    debug('getTweet called');
    return tweetInterface.get(options)
      .then(tweet => tweet)
      .catch(error => Promise.reject(error));
  };


  return {
    getList: getTweetsList,
    create: createTweet,
    get: getTweet,
  };
}

module.exports.init = init;
