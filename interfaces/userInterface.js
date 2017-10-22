// DATA LAYER
// userInterface:
// is used to provide an abstraction on top of the database ( and possible other data sources)
// so other parts of the application are decoupled from the specific database implementation.
// Furthermore it can hide the origin of the data from it's consumers.
// It is possible to fetch the entities from different sources like inmemory cache, 
// network or the db without the need to alter the consumers code.

const debug = require('debug')('interfaces:USER');
const errors = require('../common/errors');


function init({ User }) {
  debug('------- INIT INTERFACES:USER ---------');

  const DEFAULT_PAGINATION_CONTENT = {
    pagination: {},
    users: [],
  };


  const _createPaginationOptions = options => ({
    lean: true,
    page: options.page,
    limit: options.limit,
    sort: { created: -1 },
  });


  const _handleUsersPaginationResponse = (paginatedUsers) => {
    if (!paginatedUsers.docs || paginatedUsers.docs.length <= 0) {
      return DEFAULT_PAGINATION_CONTENT;
    }
    const usersList = {
      users: paginatedUsers.docs.map(user => User.toUserModel(user)),
      pagination: {
        total: paginatedUsers.total,
        limit: paginatedUsers.limit,
        page: paginatedUsers.page,
        pages: paginatedUsers.pages,
      },
    };
    return usersList;
  };


  const getList = (options) => {
    debug('get all users', options);
    const paginationOptions = _createPaginationOptions(options);
    return User.paginate({}, paginationOptions)
      .then(paginatedUsers => _handleUsersPaginationResponse(paginatedUsers))
      .catch(error => errors.genericErrorHandler(error, 'Internal error in getList func in userInterface.'));
  };


  const getListByEmail = (options) => {
    debug('get all users', options);
    const paginationOptions = _createPaginationOptions(options);
    return User.paginate({ email: options.email }, paginationOptions)
      .then(paginatedUsers => _handleUsersPaginationResponse(paginatedUsers))
      .catch(error => errors.genericErrorHandler(error, 'Internal error in getListByEmail func in userInterface.'));
  };


  const getListByName = (options) => {
    debug('get user list by name', options);
    const paginationOptions = _createPaginationOptions(options);
    return User.paginate({
      'name' : { $regex: new RegExp(options.name), $options: 'i' },
    }, paginationOptions)
      .then(paginatedUsers => _handleUsersPaginationResponse(paginatedUsers))
      .catch(error => errors.genericErrorHandler(error, 'Internal error in getListByFullName func in userInterface.'));
  };


  const getListByCreatedDate = (options) => {
    debug('get requests list by request_date', options);
    const paginationOptions = _createPaginationOptions(options);
    let queryOptions;
    if (options.toDate) {
      queryOptions = { $gte: options.fromDate, $lt: options.toDate };
    } else {
      queryOptions = { $gte: options.fromDate };
    }
    return User.paginate({ created: queryOptions }, paginationOptions)
      .then(paginatedRequests => _handleUsersPaginationResponse(paginatedRequests))
      .catch(error => errors.genericErrorHandler(error, 'Internal error in getListByCreatedDate func in requestInterface.'));
  };


  const createUser = (options) => {
    const userDocument = User({
      name: options.name,
      email: options.email,
    });
    return userDocument.save()
      .then(userDoc => userDoc)
      .catch(error => Promise.reject(error));
  };

  const getUser = options => User.findById(options.id).exec()
    .then(user => User.toUserModel(user))
    .catch(error => Promise.reject(error));


  return {
    getList,
    getListByEmail,
    getListByName,
    getListByCreatedDate,
    create: createUser,
    get: getUser,
  };
}

module.exports.init = init;
