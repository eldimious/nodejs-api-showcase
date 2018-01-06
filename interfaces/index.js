// Register all the interfaces here
const userInterfaceFactory = require('./userInterface');
const authInterfaceFactory = require('./authInterface');

module.exports = (db) => {
  const authInterface = authInterfaceFactory.init(db);
  const userInterface = userInterfaceFactory.init(db);
  return ({
    authInterface,
    userInterface,
  });
};
