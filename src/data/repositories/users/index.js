const errors = require('../../../common/errors');
const mapper = require('../../mapper');
const UserDomainModel = require('../../../domain/users/model');

const queryForGetUser = ({ email, userId }) => {
  const queries = {};
  if (userId) {
    queries._id = userId;
  }
  if (email) {
    queries.email = email;
  }
  return queries;
};

const userStore = {
  async createUser({
    name,
    surname,
    username,
    email,
    password,
  }) {
    const {
      User: userSchema,
    } = this.getSchemas();
    const newUser = new userSchema({
      name,
      surname,
      username,
      email,
      password,
    });
    const userDoc = await newUser.save();
    return mapper.toDomainModel(userDoc, UserDomainModel);
  },

  async getUser({
    email,
    userId,
  }) {
    const { User: userSchema } = this.getSchemas();
    const userDoc = await userSchema.findOne(queryForGetUser({
      email,
      userId,
    }))
      .lean()
      .exec();
    if (!userDoc) {
      throw new errors.NotFound('User not found.');
    }
    return mapper.toDomainModel(userDoc, UserDomainModel);
  },
};

module.exports.init = function init({ User }) {
  return Object.assign(Object.create(userStore), {
    getSchemas() {
      return {
        User,
      };
    },
  });
};
