const moment = require('moment');
const mongoosePaginate = require('mongoose-paginate');
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
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

PostSchema.index({ userId: 1 });

PostSchema.index({ created: -1 });

PostSchema.plugin(mongoosePaginate);

PostSchema.pre('save', function (next) {
  this.created = moment().toJSON();
  return next();
});

const PostDao = mongoose.model('Post', PostSchema);

module.exports = { PostDao };
