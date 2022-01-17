import { IRepositories } from '../../common/interfaces/IRepositories';
import { IListPostsQuery, IPaginatedPosts } from '../posts/postsRepository';
import { User } from './model';
import { IGetUserQuery } from './usersRepository';

/*
  Here is the core of our application. Here we add our business logic.
  e.g. Lets say that every time that we ask for a user, we need his posts too.
  So we add this logic in domain layer.
*/
export type GetUserQuery = IGetUserQuery & IListPostsQuery;

export interface IUsersService {
  getUser(query: GetUserQuery): Promise<{ user: User; posts: IPaginatedPosts }>
}

interface IUsersServiceFactory {
  init(repositories: IRepositories): IUsersService;
}

export const usersServiceFactory: IUsersServiceFactory = {
  init(repositories: IRepositories) {
    async function getUser(query: GetUserQuery): Promise<{
      user: User;
      posts: IPaginatedPosts;
    }> {
      const [
        user,
        posts,
      ] = await Promise.all([
        repositories.usersRepository.getUser(query as IGetUserQuery),
        repositories.postsRepository.listUserPosts(query as IListPostsQuery),
      ]);
      return {
        user,
        posts,
      };
    }

    return {
      getUser,
    };
  },
};
