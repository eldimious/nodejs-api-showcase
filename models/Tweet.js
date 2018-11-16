/**
  * This is the app Model it is decoupled from
  * the Entities used for the databse
*/
class Tweet {
  constructor({ _id, userId, imageUrl, text, publisher, created } = {}) {
    this.id = _id;
    this.userId = userId;
    this.imageUrl = imageUrl;
    this.text = text;
    this.publisher = publisher;
    this.created = created;
  }
}

module.exports = Tweet;
