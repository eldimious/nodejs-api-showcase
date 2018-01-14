// Register all the interfaces here
const tweetInterfaceFactory = require('./tweetInterface');
const authInterfaceFactory = require('./authInterface');

module.exports = (db) => {
  console.log('db.entities', db.entities)
  const authInterface = authInterfaceFactory.init(db.entities);
  const tweetInterface = tweetInterfaceFactory.init(db.entities);
  return ({
    authInterface,
    tweetInterface,
  });
};
