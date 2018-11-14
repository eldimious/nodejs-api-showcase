function init({ userInterface }) {
  async function get(options) {
    return userInterface.get(options);
  }

  return {
    get,
  };
}

module.exports = init;
