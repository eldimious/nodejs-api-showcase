/* eslint-disable no-restricted-globals */
import express, { Response, Router } from 'express';
import { IServices } from '../../../../common/interfaces/IServices';
import {
  validateUserToken,
  validatePostId,
  validateCreatePostBody,
  validate,
} from '../../middleware/endpointValidator';
import { asyncWrapper } from '../../utils/asyncWrapper';
import { IExpressRequest } from '../../../../common/interfaces/IExpressRequest';
import { IListPostsQuery } from '../../../../domain/posts/postsRepository';

// eslint-disable-next-line new-cap
const router = express.Router({ mergeParams: true });

interface IPostsRouter {
  init(services: IServices): Router;
}

export const postsRouter: IPostsRouter = {
  init(services: IServices): Router {
    const DEFAULT_PAGINATION_LIMIT = 25;
    const MAX_PAGINATION_LIMIT = 100;
    const DEFAULT_PAGINATION_PAGE = 1;

    const handlePagination = (options: IListPostsQuery): IListPostsQuery => {
      const populateOptionsWithPagination = { ...options };
      if (populateOptionsWithPagination.limit && isNaN(populateOptionsWithPagination.limit)) {
        populateOptionsWithPagination.limit = DEFAULT_PAGINATION_LIMIT;
      }
      if (populateOptionsWithPagination.page && isNaN(populateOptionsWithPagination.page)) {
        populateOptionsWithPagination.page = DEFAULT_PAGINATION_PAGE;
      }
      if (populateOptionsWithPagination.limit && populateOptionsWithPagination.limit > MAX_PAGINATION_LIMIT) {
        populateOptionsWithPagination.limit = MAX_PAGINATION_LIMIT;
      }
      return populateOptionsWithPagination;
    };

    router.get(
      '/',
      validateUserToken(),
      validate,
      asyncWrapper(async (req: IExpressRequest, res: Response) => {
        const postsList = await services.postsService.listUserPosts({
          ...handlePagination({
            userId: req.params.userId,
            publisher: req.query.publisher,
            page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
            limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 25,
          } as IListPostsQuery),
        });
        return res.send(postsList);
      }),
    );

    router.post(
      '/',
      validateUserToken(),
      validateCreatePostBody(),
      validate,
      asyncWrapper(async (req: IExpressRequest, res: Response) => {
        const newPost = await services.postsService.createUserPost({
          imageUrl: req.body.imageUrl,
          description: req.body.description,
          publisher: req.body.publisher,
          userId: req.params.userId,
        });
        return res.send({
          data: newPost,
        });
      }),
    );

    router.get(
      '/:postId',
      validateUserToken(),
      validatePostId(),
      validate,
      asyncWrapper(async (req: IExpressRequest, res: Response) => {
        const postDoc = await services.postsService.getUserPost({
          postId: req.params.postId,
          userId: req.params.userId,
        });
        return res.send({
          data: postDoc,
        });
      }),
    );

    return router;
  },
};
