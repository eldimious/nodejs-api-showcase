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
    return newUser.save();
  },

  async get({
    email,
    userId,
  }) {
    const { User: userSchema } = this.getSchemas();
    return userSchema.findOne(queryForGetUser({
      email,
      userId,
    }))
      .lean()
      .exec();
  },
};


const create = ({ User }) => Object.assign(Object.create(userStore), {
  getSchemas() {
    return {
      User,
    };
  },
});

module.exports.create = create;
