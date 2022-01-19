const {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
  MAX_PAGINATION_LIMIT,
} = require('../../../common/constants');

function getDefaultLimit(limit) {
  if (limit == null) {
    return DEFAULT_PAGINATION_LIMIT;
  }
  if (isNaN(limit)) {
    return DEFAULT_PAGINATION_LIMIT;
  }
  if (Number(limit) > MAX_PAGINATION_LIMIT) {
    return MAX_PAGINATION_LIMIT;
  }
  return limit;
}

function getDefaultPage(page) {
  if (page == null) {
    return DEFAULT_PAGINATION_PAGE;
  }
  if (isNaN(page)) {
    return DEFAULT_PAGINATION_PAGE;
  }
  return page;
}

module.exports = {
  getDefaultLimit,
  getDefaultPage,
};
