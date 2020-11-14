const USER_TOKEN_EXPIRATION = 86400;

const USER_ROLE = 'user';

const PASSWORD_COMPLEXITY = {
  min: 8,
  max: 35,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
};

module.exports = {
  USER_TOKEN_EXPIRATION,
  USER_ROLE,
  PASSWORD_COMPLEXITY,
};
