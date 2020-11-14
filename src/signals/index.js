const process = require('process');

const init = closeFunc => async () => {
  try {
    await closeFunc();
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
};


module.exports = { init };
