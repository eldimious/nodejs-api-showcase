// Register all the interfaces here
const userInterfaceFactory = require('./userInterface');

module.exports = (db) => {
  const userInterface = userInterfaceFactory.init(db);
  return ({
    userInterface,
  });
};
