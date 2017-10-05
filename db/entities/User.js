const moment = require('moment');

module.exports = (mongoose) => {
  const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: String,
    created: Date,
  });

  userSchema.index({ name: 1 });

  userSchema.pre('save', function (next) {
    this.created = moment().toJSON();
    next();
  });

  return mongoose.model('User', userSchema);
};
