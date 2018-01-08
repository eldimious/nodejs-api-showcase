const moment = require('moment');
const mongoosePaginate = require('mongoose-paginate');
const TweetModel = require('../../models/Tweet');

module.exports = (mongoose) => {
  const tweetSchema = mongoose.Schema({
    url: {
      type: String,
      required: true,
    },
    image_url: String,
    type: String,
    username: String,
    created: Date,
  });

  tweetSchema.pre('save', function (next) {
    this.created = moment().toJSON();
    return next();
  });

  tweetSchema.statics.toModel = tweetDoc => new TweetModel(tweetDoc);

  tweetSchema.index({ ncreated: -1 });

  tweetSchema.plugin(mongoosePaginate);

  return mongoose.model('Tweet', tweetSchema);
};
