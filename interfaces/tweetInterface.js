// DATA LAYER
// userInterface:
// is used to provide an abstraction on top of the database ( and possible other data sources)
// so other parts of the application are decoupled from the specific database implementation.
// Furthermore it can hide the origin of the data from it's consumers.
// It is possible to fetch the entities from different sources like inmemory cache, 
// network or the db without the need to alter the consumers code.

const debug = require('debug')('interfaces:USER');
const errors = require('../common/errors');


function init({ Tweet }) {
  debug('------- INIT INTERFACES:USER ---------');

  const DEFAULT_PAGINATION_CONTENT = {
    pagination: {},
    tweets: [],
  };


  const createPaginationOptions = options => ({
    lean: true,
    page: options.page,
    limit: options.limit,
    sort: { created: -1 },
  });


  const handleUsersPaginationResponse = (response) => {
    if (!response.docs || response.docs.length <= 0) {
      return DEFAULT_PAGINATION_CONTENT;
    }
    const tweetsList = {
      tweets: response.docs.map(tweet => Tweet.toModel(tweet)),
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
    if (options.type) {
      queries.type = options.type;
    }
    if (options.source) {
      queries.source = options.source;
    }
    if (options.publisher) {
      queries.publisher = {
        $regex: new RegExp(options.publisher),
        $options: 'i',
      };
    }
    return queries;
  };


  const getList = async (options) => {
    debug('get tweets from DB', options);
    const paginationOptions = createPaginationOptions(options);
    const queryOptions = getQueryObject(options);
    try {
      const tweetsDocs = await Tweet.paginate(queryOptions, paginationOptions);
      return handleUsersPaginationResponse(tweetsDocs);
    } catch (error) {
      return errors.genericErrorHandler(error, 'Internal error in getList func in tweetInterface.');
    }
  };


  const createTweet = async (options) => {
    const tweetDocument = Tweet({
      userId: options.userId,
      url: options.url,
      source: options.source,
      type: options.type,
      publisher: options.publisher,
    });
    try {
      const tweetDoc = await tweetDocument.save();
      return Tweet.toModel(tweetDoc);
    } catch (error) {
      return errors.genericErrorHandler(error, 'Internal error in createTweet func in tweetInterface.');
    }
  };


  const getTweet = async (options) => {
    try {
      const tweetDoc = await Tweet.findOne({ userId: options.userId, _id: options.tweetId }).lean().exec();
      if (!tweetDoc) {
        throw new errors.not_found(`Tweet with id ${options.tweetId} not found.`);
      }
      return Tweet.toModel(tweetDoc);
    } catch (error) {
      return errors.genericErrorHandler(error, 'Internal error in getTweet func in tweetInterface.');
    }
  };


  return {
    getList,
    create: createTweet,
    get: getTweet,
  };
}

module.exports.init = init;
