const errors = require('../../../common/errors');
const mapper = require('./mapper');

const userRepository = {
  async get(opts) {
    try {
      const {
        userStore,
      } = this.getStores();
      const userDoc = await userStore.get(opts);
      if (!userDoc) {
        throw new errors.NotFound('User not found.');
      }
      return mapper.toDomainModel(userDoc);
    } catch (error) {
      throw error;
    }
  },

  async create(opts) {
    try {
      const {
        userStore,
      } = this.getStores();
      const userDoc = await userStore.create(opts);
      return mapper.toDomainModel(userDoc);
    } catch (error) {
      throw error;
    }
  },
};


module.exports = function init({
  schemas,
  stores,
}) {
  return Object.assign(Object.create(userRepository), {
    getSchemas() {
      return schemas;
    },
    getStores() {
      return stores;
    },
  });
};
