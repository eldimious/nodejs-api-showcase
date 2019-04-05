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

const getPaginationOptions = options => ({
  lean: true,
  page: options.page || 1,
  limit: options.limit || 25,
  sort: { created: -1 },
});


const getQueryObject = (options) => {
  const queries = {
    userId: options.userId,
  };
  if (options.publisher) {
    queries.publisher = {
      $regex: new RegExp(options.publisher),
      $options: 'i',
    };
  }
  return queries;
};


const postStore = {
  async list(options) {
    try {
      const { Post: postSchema } = this.getSchemas();
      const docs = await postSchema.paginate(getQueryObject(options), getPaginationOptions(options));
      return handleUsersPaginationResponse(docs);
    } catch (error) {
      throw error;
    }
  },
  async create(options) {
    try {
      const { Post: postSchema } = this.getSchemas();
      const newPost = new postSchema({
        userId: options.userId,
        imageUrl: options.imageUrl,
        description: options.description,
        publisher: options.publisher,
      });
      const doc = await newPost.save();
      return mapper.toDomainModel(doc);
    } catch (error) {
      throw error;
    }
  },
  async get(options) {
    try {
      const { Post: postSchema } = this.getSchemas();
      const doc = await postSchema.findOne({ userId: options.userId, _id: options.postId }).lean().exec();
      if (!doc) {
        throw new errors.NotFound(`Post with id ${options.postId} not found.`);
      }
      return mapper.toDomainModel(doc);
    } catch (error) {
      throw error;
    }
  },
};


module.exports = ({ Post }) => Object.assign(Object.create(postStore), {
  getSchemas() {
    return {
      Post,
    };
  },
});

