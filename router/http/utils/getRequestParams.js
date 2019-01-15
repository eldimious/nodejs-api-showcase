// add default opts in routes that we user's info
const getDefaultRequestParams = function getDefaultRequestParams(req) {
  return {
    userId: req.user._id,
  };
};

module.exports = {
  getDefaultRequestParams,
};
