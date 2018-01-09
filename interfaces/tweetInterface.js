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


  const _createPaginationOptions = options => ({
    lean: true,
    page: options.page,
    limit: options.limit,
    sort: { created: -1 },
  });


  const _handleUsersPaginationResponse = (response) => {
    if (!response.docs || response.docs.length <= 0) {
      return DEFAULT_PAGINATION_CONTENT;
    }
    const usersList = {
      tweets: response.docs.map(tweet => Tweet.toModel(tweet)),
      pagination: {
        total: response.total,
        limit: response.limit,
        page: response.page,
        pages: response.pages,
      },
    };
    return usersList;
  };


  const _constructQueryObject = (options) => {
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


  const getList = (options) => {
    debug('get tweets from DB', options);
    const paginationOptions = _createPaginationOptions(options);
    const queryOptions = _constructQueryObject(options);
    return Tweet.paginate(queryOptions, paginationOptions)
      .then(paginatedRequests => _handleUsersPaginationResponse(paginatedRequests))
      .catch(error => errors.genericErrorHandler(error, 'Internal error in getList func in tweetInterface.'));
  };


  const createTweet = (options) => {
    const tweetDocument = Tweet({
      userId: options.userId,
      url: options.url,
      source: options.source,
      type: options.type,
      publisher: options.publisher,
    });
    return tweetDocument.save()
      .then(tweetDoc => Tweet.toModel(tweetDoc))
      .catch(error => errors.genericErrorHandler(error, 'Internal error in createTweet func in tweetInterface.'));
  };


  const getTweet = options => Tweet.findById(options.id).exec()
    .then((tweetDoc) => {
      if (!tweetDoc) {
        return Promise.reject(new errors.not_found(`Tweet with id ${options.id} not found.`));
      }
      return Tweet.toModel(tweetDoc);
    })
    .catch(error => errors.genericErrorHandler(error, 'Internal error in getTweet func in tweetInterface.'));


  return {
    getList,
    create: createTweet,
    get: getTweet,
  };
}

module.exports.init = init;
