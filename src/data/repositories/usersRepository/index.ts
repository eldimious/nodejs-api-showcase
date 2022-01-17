import { FilterQuery } from 'mongoose';
import errors from '../../../common/errors';
import { UserDao } from '../../infrastructure/db/schemas/User';
import { User } from '../../../domain/users/model';
import { IUsersRepository, IGetUserQuery, ICreateUser } from '../../../domain/users/usersRepository';

interface IUsersRepositoryFactory {
  init(): IUsersRepository;
}

const queryForGetUser = (query: IGetUserQuery): FilterQuery<typeof UserDao> => {
  const queries: FilterQuery<typeof UserDao> = {};
  if (query.userId) {
    // eslint-disable-next-line no-underscore-dangle
    queries._id = query.userId;
  }
  if (query.email) {
    queries.email = query.email;
  }
  return queries;
};

const userStore: IUsersRepository = {
  async getUser(query: IGetUserQuery): Promise<User> {
    const userDoc = await UserDao.findOne(queryForGetUser(query));
    if (!userDoc) {
      throw new errors.NotFound('User not found.');
    }
    return userDoc.toUser();
  },
  async createUser(createUserDto: ICreateUser): Promise<User> {
    let userModel = new UserDao(createUserDto);
    userModel = await userModel.save();
    return userModel.toUser();
  },
};

export const usersRepositoryFactory: IUsersRepositoryFactory = {
  init(): IUsersRepository {
    return Object.create(userStore);
  },
};
