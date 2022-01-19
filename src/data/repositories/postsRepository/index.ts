// DATA LAYER
// postRepository:
// is used to provide an abstraction on top of the database ( and possible other data sources)
// so other parts of the application are decoupled from the specific database implementation.
// Furthermore it can hide the origin of the data from it's consumers.
// It is possible to fetch the entities from different sources like inmemory cache,
// network or the db without the need to alter the consumers code.
// I am using a factory function (using object literal and prototype) to pass methods on prototype chain
// With factory functions(closures) we can have data privacy.
import { FilterQuery, PaginateOptions, PaginateResult } from 'mongoose';
import {
  IPostsRepository,
  IListPostsQuery,
  ICreatePostDto,
  IGetUserPostQuery,
  IPaginatedPosts,
} from '../../../domain/posts/postsRepository';
import { IPostEntity, PostDao } from '../../infrastructure/db/schemas/Post';
import errors from '../../../common/errors';
import { Post } from '../../../domain/posts/model';

interface IPostsRepositoryFactory {
  init(): IPostsRepository;
}

const DEFAULT_PAGINATION_CONTENT: IPaginatedPosts = {
  pagination: {
    total: undefined,
    limit: undefined,
    pages: undefined,
    page: undefined,
  },
  data: [],
};

const handleUsersPaginationResponse = (response: PaginateResult<IPostEntity>): IPaginatedPosts => {
  if (!response || !response.docs || response.docs.length <= 0) {
    return DEFAULT_PAGINATION_CONTENT;
  }
  const postsList: IPaginatedPosts = {
    data: response.docs.map((doc: IPostEntity) => doc.toPost()),
    pagination: {
      total: response.total,
      limit: response.limit,
      page: response.page,
      pages: response.pages,
    },
  };
  return postsList;
};

const getPaginationOptions = (query: IListPostsQuery): PaginateOptions => ({
  page: query.page || 1,
  limit: query.limit || 25,
  sort: { created: -1 },
});

const getQueryObject = (query: IListPostsQuery) => {
  const queries: FilterQuery<typeof PostDao> = {
    userId: query.userId,
  };
  if (query.publisher) {
    queries.publisher = {
      $regex: new RegExp(query.publisher),
      $options: 'i',
    };
  }
  return queries;
};

const postStore: IPostsRepository = {
  async listUserPosts(query: IListPostsQuery): Promise<IPaginatedPosts> {
    const docs = await PostDao.paginate(getQueryObject(query), getPaginationOptions(query));
    return handleUsersPaginationResponse(docs);
  },
  async createUserPost(createPostDto: ICreatePostDto): Promise<Post> {
    let postModel = new PostDao(createPostDto);
    postModel = await postModel.save();
    return postModel.toPost();
  },
  async getUserPost(query: IGetUserPostQuery): Promise<Post> {
    const doc = await PostDao.findOne({ userId: query.userId, _id: query.postId });
    if (!doc) {
      throw new errors.NotFound(`Post with id ${query.postId} not found.`);
    }
    return doc.toPost();
  },
};

export const postsRepositoryFactory: IPostsRepositoryFactory = {
  init(): IPostsRepository {
    return Object.create(postStore);
  },
};
