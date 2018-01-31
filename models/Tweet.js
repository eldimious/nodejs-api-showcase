/**
  * This is the app Model it is decoupled from
  * the Entities used for the databse
*/
class Tweet {
  constructor({ _id, userId, url, source, type, publisher, created } = {}) {
    this.id = _id;
    this.userId = userId;
    this.url = url;
    this.source = source;
    this.type = type;
    this.publisher = publisher;
    this.created = created;
  }
}

module.exports = Tweet;
