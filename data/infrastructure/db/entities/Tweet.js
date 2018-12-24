const mongoose = require('mongoose');
const moment = require('moment');
const mongoosePaginate = require('mongoose-paginate');
const TweetModel = require('../../../../domain/tweet/model');


const tweetSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: String,
  publisher: {
    type: String,
    required: true,
  },
  created: Date,
});


tweetSchema.pre('save', (next) => {
  this.created = moment().toJSON();
  return next();
});

tweetSchema.statics.toModel = tweetDoc => new TweetModel(tweetDoc);

tweetSchema.index({ created: -1 });

tweetSchema.plugin(mongoosePaginate);

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
