/**
  * This is the app Model it is decoupled from
  * the Entities used for the databse
*/
class Tweet {
  constructor(tweetObj) {
    this.id = tweetObj._id;
    this.userId = tweetObj.userId;
    this.url = tweetObj.url;
    this.source = tweetObj.source;
    this.type = tweetObj.type;
    this.publisher = tweetObj.publisher;
    this.created = tweetObj.created;
  }
}

module.exports = Tweet;
