// DATA LAYER
// postRepository:
// is used to provide an abstraction on top of the database ( and possible other data sources)
// so other parts of the application are decoupled from the specific database implementation.
// Furthermore it can hide the origin of the data from it's consumers.
// It is possible to fetch the entities from different sources like inmemory cache,
// network or the db without the need to alter the consumers code.
// I am using a factory function (using object literal and prototype) to pass methods on prototype chain
// With factory functions(closures) we can have data privacy.

const errors = require('../../../common/errors');
const mapper = require('./mapper');


const DEFAULT_PAGINATION_CONTENT = {
  pagination: {},
  data: [],
};


const handleUsersPaginationResponse = (response) => {
  if (!response.docs || response.docs.length <= 0) {
    return DEFAULT_PAGINATION_CONTENT;
  }
  const postsList = {
    data: response.docs.map(doc => mapper.toDomainModel(doc)),
    pagination: {
      total: response.total,
      limit: response.limit,
      page: response.page,
      pages: response.pages,
    },
  };
  return postsList;
};


const postRepository = {
  async list(options) {
    try {
      const {
        postStore,
      } = this.getStores();
      const docs = await postStore.list(options);
      return handleUsersPaginationResponse(docs);
    } catch (error) {
      throw error;
    }
  },
  async create(options) {
    try {
      const {
        postStore,
      } = this.getStores();
      const doc = await postStore.create(options).save();
      return mapper.toDomainModel(doc);
    } catch (error) {
      throw error;
    }
  },
  async get(options) {
    try {
      const {
        postStore,
      } = this.getStores();
      const doc = await postStore.get(options);
      if (!doc) {
        throw new errors.NotFound(`Post with id ${options.postId} not found.`);
      }
      return mapper.toDomainModel(doc);
    } catch (error) {
      throw error;
    }
  },
};


module.exports = function init({
  schemas,
  stores,
}) {
  return Object.assign(Object.create(postRepository), {
    getSchemas() {
      return schemas;
    },
    getStores() {
      return stores;
    },
  });
};
