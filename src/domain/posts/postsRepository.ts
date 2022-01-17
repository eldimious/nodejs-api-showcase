import { IPagination } from '../../common/interfaces/IPagination';
import { Post } from './model';

export interface IListPostsQuery {
  userId: string,
  publisher?: string,
  page?: number,
  limit?: number,
}

export interface IGetUserPostQuery {
  userId: string,
  postId: string,
}

export interface ICreatePostDto {
  userId: string,
  imageUrl: string,
  description: string,
  publisher: string,
}

export interface IPaginatedPosts {
  pagination: IPagination;
  data: Post[];
}

export interface IPostsRepository {
  listUserPosts(query: IListPostsQuery): Promise<IPaginatedPosts>;
  createUserPost(createPostDto: ICreatePostDto): Promise<Post>;
  getUserPost(query: IGetUserPostQuery): Promise<Post>;
}
