const moment = require('moment');
const mongoosePaginate = require('mongoose-paginate');
const UserModel = require('../../models/User');
const bcrypt = require('bcrypt');

module.exports = (mongoose) => {
  const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    surname: {
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
    console.log('presaveeeeeeeeee')
    console.log('this.password', this.password)
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

  userSchema.statics.comparePassword = (pass, dbPass) => {
    console.log('passpass', pass)
    console.log('this.password', dbPass)
    return bcrypt.compare(pass, dbPass)
      .then(match => match)
      .catch(() => false);
  };

  userSchema.index({ name: 1 });

  userSchema.index({ name: 1, created: -1 });

  userSchema.plugin(mongoosePaginate);

  return mongoose.model('User', userSchema);
};
