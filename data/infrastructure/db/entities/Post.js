const mongoose = require('mongoose');
const moment = require('moment');
const mongoosePaginate = require('mongoose-paginate');
const PostModel = require('../../../../domain/post/model');


const postSchema = mongoose.Schema({
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


postSchema.pre('save', (next) => {
  this.created = moment().toJSON();
  return next();
});

postSchema.statics.toModel = post => new PostModel(post);

postSchema.index({ created: -1 });

postSchema.plugin(mongoosePaginate);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
