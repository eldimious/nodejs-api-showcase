const errors = require('../../../common/errors');
const mapper = require('./mapper');
const bcrypt = require('bcryptjs');

const comparePassword = (password, dbPassword) => bcrypt.compare(password, dbPassword)
  .then(match => match)
  .catch(() => false);

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

  async authenticate(opts) {
    try {
      const {
        userStore,
      } = this.getStores();
      const userDoc = await userStore.get(opts);
      if (!userDoc) {
        throw new errors.NotFound('User not found.');
      }
      const userPass = await comparePassword(opts.password, userDoc.password);
      if (!userPass) {
        throw new errors.Unauthorized('Wrong password.');
      }
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
