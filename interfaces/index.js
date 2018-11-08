const tweetInterface = require('./tweetInterface');
const authInterface = require('./authInterface');

module.exports = (db) => {
  return ({
    authInterface: authInterface(db.entities),
    tweetInterface: tweetInterface(db.entities),
  });
};
