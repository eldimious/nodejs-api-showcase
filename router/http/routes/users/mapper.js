const UserResponse = require('./responses');

const toResponseModel = function toResponseModel(userDoc) {
  return new UserResponse({ ...userDoc });
};


module.exports = {
  toResponseModel,
};
