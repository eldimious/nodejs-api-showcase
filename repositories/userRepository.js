const errors = require('../common/errors');


const mapperToUserModel = (UserSchema, userDoc) => UserSchema.toUserModel({
  _id: userDoc._id,
  name: userDoc.name,
  surname: userDoc.surname,
  email: userDoc.email,
  created: userDoc.created,
});


const userRepository = {
  async get(options) {
    const { User: userSchema } = this.getSchemas();
    try {
      const userDoc = await userSchema.findOne({
        _id: options.userId,
      })
        .lean()
        .exec();
      if (!userDoc) {
        throw new errors.NotFound(`User with id ${options.userId} not found.`);
      }
      return mapperToUserModel(userSchema, userDoc);
    } catch (error) {
      throw error;
    }
  },
};


const init = ({ User }) => Object.assign(Object.create(userRepository), {
  getSchemas() {
    return {
      User,
    };
  },
});

module.exports = init;
