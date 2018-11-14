const tweetInterface = require('./tweetInterface');
const authInterface = require('./authInterface');
const userInterface = require('./userInterface');

module.exports = db => ({
  authInterface: authInterface(db.entities),
  tweetInterface: tweetInterface(db.entities),
  userInterface: userInterface(db.entities),
});
