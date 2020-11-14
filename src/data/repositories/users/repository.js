const errors = require('../../../common/errors');
const mapper = require('./mapper');

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
  async create({
    name,
    surname,
    username,
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
        username,
        email,
        password,
      });
      const userDoc = await newUser.save();
      return mapper.toDomainModel(userDoc);
    } catch (error) {
      throw error;
    }
  },

  async get({
    email,
    userId,
  }) {
    try {
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
      return mapper.toDomainModel(userDoc);
    } catch (error) {
      throw error;
    }
  },
};


module.exports = function init({ User }) {
  return Object.assign(Object.create(userStore), {
    getSchemas() {
      return {
        User,
      };
    },
  });
};
