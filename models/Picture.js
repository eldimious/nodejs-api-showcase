/**
  * This is the app Model it is decoupled from 
  * the Entities used for the databse
*/
class Picture {
  constructor(imageUrl, postUrl, created, network, networkId, userID) {
    this.imageUrl = imageUrl;
    this.postUrl = postUrl;
    this.created = created;
    this.network = network;
    this.networkId = networkId;
    this.userID = userID;
  }
}

module.exports = Picture;
