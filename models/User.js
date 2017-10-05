/**
  * This is the app Model it is decoupled from 
  * the Entities used for the databse
*/
class User {
  constructor(name, email, created) {
    this.name = name;
    this.email = email;
    this.created = created;
  }
}

module.exports = User;
