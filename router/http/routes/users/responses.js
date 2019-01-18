/**
  * This is the user response.
  * Added in order to avoid return password as response.
  * Password is property of our business model in domain layer.
*/
class UserResponse {
  constructor({ id, fullName, username, email, created } = {}) {
    this.id = id;
    this.fullName = fullName;
    this.username = username;
    this.email = email;
    this.created = created;
  }
}

module.exports = UserResponse;
