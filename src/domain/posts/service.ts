// DOMAIN LAYER
// Has the postRepository as a dependency. The PostService does not know
// nor does it care where the post models came from. This is abstracted away
// by the implementation of the repositories. It just calls the needed repositories
// gets the results and usually applies some business logic on them.
import { IRepositories } from '../../common/interfaces/IRepositories';
import { Post } from './model';
import {
  IListPostsQuery,
  ICreatePostDto,
  IGetUserPostQuery,
  IPaginatedPosts,
} from './postsRepository';

export interface IPostsService {
  listUserPosts(query: IListPostsQuery): Promise<IPaginatedPosts>,
  createUserPost(createPostDto: ICreatePostDto): Promise<Post>,
  getUserPost(query: IGetUserPostQuery): Promise<Post>
}

interface IPostsServiceFactory {
  init(repositories: IRepositories): IPostsService;
}

export const postsServiceFactory: IPostsServiceFactory = {
  init(repositories: IRepositories) {
    async function listUserPosts(query: IListPostsQuery): Promise<IPaginatedPosts> {
      return repositories.postsRepository.listUserPosts(query);
    }

    async function createUserPost(createPostDto: ICreatePostDto): Promise<Post> {
      return repositories.postsRepository.createUserPost(createPostDto);
    }

    async function getUserPost(query: IGetUserPostQuery): Promise<Post> {
      return repositories.postsRepository.getUserPost(query);
    }

    return {
      listUserPosts,
      createUserPost,
      getUserPost,
    };
  },
};
