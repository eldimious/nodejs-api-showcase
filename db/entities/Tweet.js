const mongoose = require('mongoose');
const moment = require('moment');
const mongoosePaginate = require('mongoose-paginate');
const TweetModel = require('../../models/Tweet');

const Schema = mongoose.Schema;

const tweetSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  url: {
    type: String,
    required: true,
  },
  source: String,
  type: String,
  publisher: String,
  created: Date,
});

tweetSchema.pre('save', function (next) {
  this.created = moment().toJSON();
  return next();
});

tweetSchema.statics.toModel = tweetDoc => new TweetModel(tweetDoc);

tweetSchema.index({ ncreated: -1 });

tweetSchema.plugin(mongoosePaginate);

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
