import express, { Response, Router } from 'express';
import {
  validateUserToken,
  validate,
} from '../../middleware/endpointValidator';
import { asyncWrapper } from '../../utils/asyncWrapper';
import { postsRouter } from '../posts/routes';
import { GetUserQuery } from '../../../../domain/users/service';
import { IServices } from '../../../../common/interfaces/IServices';
import { IExpressRequest } from '../../../../common/interfaces/IExpressRequest';

// eslint-disable-next-line new-cap
const router = express.Router({ mergeParams: true });

interface IUsersRouter {
  init(services: IServices): Router;
}

export const usersRouter: IUsersRouter = {
  init(services: IServices) {
    router.get(
      '/:userId',
      validateUserToken(),
      validate,
      asyncWrapper(async (req: IExpressRequest, res: Response) => {
        const result = await services.usersService.getUser({
          userId: req.params.userId,
        } as GetUserQuery);
        return res.send({
          data: {
            ...result.user.toUserResponse(),
            posts: result.posts,
          },
        });
      }),
    );

    router.use('/:userId/posts', postsRouter.init({ postsService: services.postsService } as IServices));

    return router;
  },
};
