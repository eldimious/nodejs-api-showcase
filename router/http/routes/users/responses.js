/**
  * This is the user response
*/
class UserResponse {
  constructor({ _id, fullName, username, email, created } = {}) {
    this.id = _id;
    this.fullName = fullName;
    this.username = username;
    this.email = email;
    this.created = created;
  }
}

module.exports = UserResponse;
