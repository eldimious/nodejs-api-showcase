const moment = require('moment');

module.exports = (mongoose) => {
  const pictureSchema = mongoose.Schema({
    imageUrl: { type: String, required: true },
    postUrl: String,
    postId: String,
    created: Date,
    network: { type: String, index: true, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  });

  pictureSchema.pre('save', function (next) {
    this.created = moment().toJSON();
    next();
  });

  return mongoose.model('Picture', pictureSchema);
};
