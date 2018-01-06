// Register all the interfaces here
const tweetInterfaceFactory = require('./tweetInterface');
const authInterfaceFactory = require('./authInterface');

module.exports = (db) => {
  const authInterface = authInterfaceFactory.init(db);
  const tweetInterface = tweetInterfaceFactory.init(db);
  return ({
    authInterface,
    tweetInterface,
  });
};
