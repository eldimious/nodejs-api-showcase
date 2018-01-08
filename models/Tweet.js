/**
  * This is the app Model it is decoupled from 
  * the Entities used for the databse
*/
class Tweet {
  constructor(tweetObj) {
    this.id = tweetObj._id;
    this.url = tweetObj.url;
    this.image_url = tweetObj.image_url;
    this.type = tweetObj.type;
    this.username = tweetObj.username;
    this.created = tweetObj.created;
  }
}

module.exports = Tweet;
