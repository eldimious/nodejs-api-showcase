/**
  * This is the app Model it is decoupled from
  * the Entities used for the databse
*/
class Token {
  constructor({
    accessToken,
    expiresIn,
    tokenType,
    roles,
  } = {}) {
    if (accessToken == null || typeof accessToken !== 'string') {
      throw new Error('accessToken should be a string');
    }
    if (tokenType == null || typeof tokenType !== 'string') {
      throw new Error('tokenType should be a string');
    }
    if (roles == null || !Array.isArray(roles) || roles.length <= 0) {
      throw new Error('roles should ben a array');
    }
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
    this.tokenType = tokenType;
    this.roles = roles;
  }
}

module.exports = Token;
