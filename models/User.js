/**
  * This is the app Model it is decoupled from 
  * the Entities used for the databse
*/
class User {
  constructor(userObj) {
    this.id = userObj._id;
    this.fullName = `${userObj.name} ${userObj.surname}`;
    this.email = userObj.email;
    this.created = userObj.created;
  }
}

module.exports = User;
