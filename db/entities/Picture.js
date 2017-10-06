const moment = require('moment');
const PictureModel = require('../../models/Picture');

module.exports = (mongoose) => {
  const pictureSchema = mongoose.Schema({
    imageUrl: { type: String, required: true },
    postUrl: String,
    postId: String,
    created: Date,
    network: { type: String, index: true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  });

  pictureSchema.pre('save', function (next) {
    this.created = moment().toJSON();
    next();
  });

  pictureSchema.statics.toPictureModel = function(picture) {
    return new PictureModel(picture.imageUrl, picture.postUrl, picture.created, picture.network, picture.networkId, picture.user, picture['_id']);
  };

  return mongoose.model('Picture', pictureSchema);
};
