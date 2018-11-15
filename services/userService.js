function init({ userRepository }) {
  async function get(options) {
    return userRepository.get(options);
  }

  return {
    get,
  };
}

module.exports = init;
