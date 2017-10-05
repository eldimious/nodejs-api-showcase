const moment = require('moment');
const UserModel = require('../../models/User');

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

  userSchema.statics.toUserModel = function(user) {
    return new UserModel(user.name, user.email, user.created, user['_id']);
  };

  return mongoose.model('User', userSchema);
};
