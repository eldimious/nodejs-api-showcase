// DATA LAYER
// authInterface:
// is used to provide an abstraction on top of the database ( and possible other data sources)
// so other parts of the application are decoupled from the specific database implementation.
// Furthermore it can hide the origin of the data from it's consumers.
// It is possible to fetch the entities from different sources like inmemory cache,
// network or the db without the need to alter the consumers code.

const errors = require('../common/errors');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configuration');

const mapperToUserModel = (UserSchema, userDoc) => UserSchema.toUserModel({
  _id: userDoc._id,
  name: userDoc.name,
  surname: userDoc.surname,
  email: userDoc.email,
  created: userDoc.created,
});

const authInterface = {
  async register({
    name,
    surname,
    email,
    password,
  }) {
    try {
      const {
        User: userSchema,
      } = this.getSchemas();
      const newUser = new userSchema({
        name,
        surname,
        email,
        password,
      });
      const userDoc = await newUser.save();
      return mapperToUserModel(userSchema, userDoc);
    } catch (error) {
      throw error;
    }
  },

  async login({
    password,
    email,
  }) {
    try {
      const {
        User: userSchema,
      } = this.getSchemas();
      const userDBDoc = await userSchema.findOne({ email }).exec();
      if (!userDBDoc) {
        throw new errors.Unauthorized(`UserDoc with email: ${email} not found.`);
      }
      const userDoc = mapperToUserModel(userSchema, userDBDoc);
      const userPass = await userSchema.comparePassword(password, userDBDoc.password);
      if (!userPass) {
        throw new errors.Unauthorized('Wrong password.');
      }
      return {
        token: jwt.sign({ email: userDoc.email, fullName: userDoc.fullName, _id: userDoc.id }, jwtSecret, { expiresIn: 86400 }),
        user: userDoc,
      };
    } catch (error) {
      throw error;
    }
  },
};


module.exports = function init({
  User,
}) {
  return Object.assign(Object.create(authInterface), {
    getSchemas () {
      return { 
        User,
      };
    },
  });
};
