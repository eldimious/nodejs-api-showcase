import moment from 'moment';
import bcrypt from 'bcryptjs';
import uniqueValidator from 'mongoose-unique-validator';
import mongoose from 'mongoose';
import { User } from '../../../../domain/users/model';

export interface IDocumentUser extends mongoose.Document {
  name: string;
  surname: string;
  username: string;
  password: string;
  email: string;
  created: Date;
}

export interface IUserEntity extends IDocumentUser {
  toUser(): User;
}

export const UserSchema = new mongoose.Schema({
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
    unique: true,
  },
  created: Date,
});

UserSchema.index({ name: 1 });

UserSchema.index({ name: 1, created: -1 });

UserSchema.plugin(uniqueValidator);

UserSchema.methods.toUser = function toUser(): User {
  return new User(this._id, this.name, this.surname, this.username, this.email, this.password, this.created);
};

UserSchema.pre('save', function (next) {
  this.created = moment().toJSON();
  bcrypt.genSalt(10, (err: Error, salt: string) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, (error: Error, hash: string) => {
      if (error) {
        return next(error);
      }
      this.password = hash;
      this.created = moment().toJSON();
      return next();
    });
  });
});

export const UserDao = mongoose.model<IUserEntity>('User', UserSchema);
