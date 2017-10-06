// Register all the interfaces here
const userInterfaceFactory = require('./userInterface');
const pictureInterfaceFactory = require('./pictureInterface');

module.exports = (db) => {
  const userInterface = userInterfaceFactory.init(db);
  const pictureInterface = pictureInterfaceFactory.init(db);
  return ({
    userInterface,
    pictureInterface,
  });
};
