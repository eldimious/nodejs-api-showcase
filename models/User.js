/**
  * This is the app Model it is decoupled from 
  * the Entities used for the databse
*/
class User {
  constructor(name, created) {
    this.name = name;
    this.created = created;
  }
}

module.exports = User;
