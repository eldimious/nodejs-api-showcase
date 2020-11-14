const moment = require('moment');
const mongoosePaginate = require('mongoose-paginate');

function create(mongoose) {
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

  postSchema.index({ created: -1 });

  postSchema.plugin(mongoosePaginate);

  return mongoose.model('Post', postSchema);
}

module.exports = create;
