/**
  * This is the app Model it is decoupled from
  * the Entities used for the databse
*/
class User {
  constructor({ _id, name, surname, username, email, password, created } = {}) {
    this.id = _id;
    this.fullName = `${name} ${surname}`;
    this.username = username;
    this.email = email;
    this.password = password;
    this.created = created;
  }
}

module.exports = User;
