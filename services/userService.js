function init({ userInterface }) {
  async function get(options) {
    return userInterface.register(options);
  }

  return {
    get,
  };
}

module.exports = init;
