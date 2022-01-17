import { User } from './model';

export interface IGetUserQuery {
  email?: string,
  userId?: string
}

export interface ICreateUser {
  name: string,
  surname: string,
  username: string,
  email: string,
  password: string,
}

export interface IUsersRepository {
  getUser(query: IGetUserQuery): Promise<User>;
  createUser(createUserDto: ICreateUser): Promise<User>;
}
