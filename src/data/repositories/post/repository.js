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

const DEFAULT_PAGINATION_CONTENT = {
  pagination: {},
  data: [],
};


const getPaginationOptions = options => ({
  lean: true,
  page: options.page,
  limit: options.limit,
  sort: { created: -1 },
});


const mapToPostModel = (postDoc, Post) => Post.toModel({
  _id: postDoc._id,
  userId: postDoc.userId,
  imageUrl: postDoc.imageUrl,
  description: postDoc.description,
  publisher: postDoc.publisher,
  created: postDoc.created,
});


const handleUsersPaginationResponse = (response, Post) => {
  if (!response.docs || response.docs.length <= 0) {
    return DEFAULT_PAGINATION_CONTENT;
  }
  const postsList = {
    data: response.docs.map(doc => mapToPostModel(doc, Post)),
    pagination: {
      total: response.total,
      limit: response.limit,
      page: response.page,
      pages: response.pages,
    },
  };
  return postsList;
};


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


const postRepository = {
  async list(options) {
    try {
      const { Post: postSchema } = this.getSchemas();
      const docs = await postSchema.paginate(getQueryObject(options), getPaginationOptions(options));
      return handleUsersPaginationResponse(docs, postSchema);
    } catch (error) {
      throw error;
    }
  },
  async create(options) {
    try {
      const { Post: postSchema } = this.getSchemas();
      const doc = await postSchema({
        userId: options.userId,
        imageUrl: options.imageUrl,
        description: options.description,
        publisher: options.publisher,
      }).save();
      return mapToPostModel(doc, postSchema);
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
      return mapToPostModel(doc, postSchema);
    } catch (error) {
      throw error;
    }
  },
};


const init = ({ Post }) => Object.assign(Object.create(postRepository), {
  getSchemas() {
    return {
      Post,
    };
  },
});


module.exports = init;
