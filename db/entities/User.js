const mongoose = require('mongoose');
const moment = require('moment');
const mongoosePaginate = require('mongoose-paginate');
const UserModel = require('../../models/User');
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  created: Date,
});

userSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      this.created = moment().toJSON();
      return next();
    });
  });
});

userSchema.statics.toUserModel = userDoc => new UserModel(userDoc);

userSchema.statics.comparePassword = (pass, dbPass) => bcrypt.compare(pass, dbPass)
  .then(match => match)
  .catch(() => false);

userSchema.index({ name: 1 });

userSchema.index({ name: 1, created: -1 });

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);

module.exports = User;
