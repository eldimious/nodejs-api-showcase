/**
  * This is the app Model it is decoupled from
  * the Entities used for the databse
*/
class Post {
  constructor({ _id, userId, imageUrl, description, publisher, created } = {}) {
    this.id = _id;
    this.userId = userId;
    this.imageUrl = imageUrl;
    this.description = description;
    this.publisher = publisher;
    this.created = created;
  }
}

module.exports = Post;
