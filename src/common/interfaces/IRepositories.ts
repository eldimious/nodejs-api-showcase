import { IPostsRepository } from '../../domain/posts/postsRepository';
import { IRecourceLimiterRepository } from '../../data/repositories/recourceLimiterRepository';
import { IAuthenticationRepository } from '../../domain/auth/authenticationRepository';
import { IUsersRepository } from '../../domain/users/usersRepository';

export interface IRepositories {
  authenticationRepository: IAuthenticationRepository,
  usersRepository: IUsersRepository,
  recourceLimiterRepository: IRecourceLimiterRepository,
  postsRepository: IPostsRepository
}
