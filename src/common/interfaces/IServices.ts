import { IAuthService } from '../../domain/auth/service';
import { IPostsService } from '../../domain/posts/service';
import { IUsersService } from '../../domain/users/service';

export interface IServices {
  authService: IAuthService,
  postsService: IPostsService,
  usersService: IUsersService,
};
