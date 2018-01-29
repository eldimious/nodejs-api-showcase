// Register all the interfaces here
const tweetInterfaceFactory = require('./tweetInterface');
const authInterfaceFactory = require('./authInterface');

module.exports = (db) => {
  return ({
    authInterface: authInterfaceFactory.init(db.entities),
    tweetInterface: tweetInterfaceFactory.init(db.entities),
  });
};
