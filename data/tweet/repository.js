// DATA LAYER
// tweetRepository:
// is used to provide an abstraction on top of the database ( and possible other data sources)
// so other parts of the application are decoupled from the specific database implementation.
// Furthermore it can hide the origin of the data from it's consumers.
// It is possible to fetch the entities from different sources like inmemory cache,
// network or the db without the need to alter the consumers code.
// I am using a factory function (using object literal and prototype) to pass methods on prototype chain
// With factory functions(closures) we can have data privacy.


const errors = require('../../common/errors');

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


const mapToTweetModel = (tweetDoc, Tweet) => Tweet.toModel({
  _id: tweetDoc._id,
  userId: tweetDoc.userId,
  imageUrl: tweetDoc.imageUrl,
  description: tweetDoc.description,
  publisher: tweetDoc.publisher,
  created: tweetDoc.created,
});


const handleUsersPaginationResponse = (response, Tweet) => {
  if (!response.docs || response.docs.length <= 0) {
    return DEFAULT_PAGINATION_CONTENT;
  }
  const tweetsList = {
    data: response.docs.map(tweetDoc => mapToTweetModel(tweetDoc, Tweet)),
    pagination: {
      total: response.total,
      limit: response.limit,
      page: response.page,
      pages: response.pages,
    },
  };
  return tweetsList;
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


const tweetRepository = {
  async list(options) {
    try {
      const { Tweet: tweetSchema } = this.getSchemas();
      const tweetsDocs = await tweetSchema.paginate(getQueryObject(options), getPaginationOptions(options));
      return handleUsersPaginationResponse(tweetsDocs, tweetSchema);
    } catch (error) {
      throw error;
    }
  },
  async create(options) {
    try {
      const { Tweet: tweetSchema } = this.getSchemas();
      const tweetDocument = tweetSchema({
        userId: options.userId,
        imageUrl: options.imageUrl,
        description: options.description,
        publisher: options.publisher,
      });
      const tweetDoc = await tweetDocument.save();
      return mapToTweetModel(tweetDoc, tweetSchema);
    } catch (error) {
      throw error;
    }
  },
  async get(options) {
    try {
      const { Tweet: tweetSchema } = this.getSchemas();
      const tweetDoc = await tweetSchema.findOne({ userId: options.userId, _id: options.tweetId }).lean().exec();
      if (!tweetDoc) {
        throw new errors.NotFound(`Tweet with id ${options.tweetId} not found.`);
      }
      return mapToTweetModel(tweetDoc, tweetSchema);
    } catch (error) {
      throw error;
    }
  },
};


const init = ({ Tweet }) => Object.assign(Object.create(tweetRepository), {
  getSchemas() {
    return {
      Tweet,
    };
  },
});


module.exports = init;
