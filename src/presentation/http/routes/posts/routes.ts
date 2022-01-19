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
import {
  getDefaultLimit,
  getDefaultPage,
} from '../../utils/pagination';

// eslint-disable-next-line new-cap
const router = express.Router({ mergeParams: true });

interface IPostsRouter {
  init(services: IServices): Router;
}

function init(services: IServices): Router {
  router.get(
    '/',
    validateUserToken(),
    validate,
    asyncWrapper(async (req: IExpressRequest, res: Response) => {
      const postsList = await services.postsService.listUserPosts({
        userId: req.params.userId,
        publisher: req.query.publisher,
        page: getDefaultPage(parseInt(req.query.page as string, 10)),
        limit: getDefaultLimit(parseInt(req.query.limit as string, 10)),
      } as IListPostsQuery);
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
}

export const postsRouter: IPostsRouter = {
  init,
};
