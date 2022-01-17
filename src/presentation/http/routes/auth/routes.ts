import express, { Response, Router } from 'express';
import { IServices } from '../../../../common/interfaces/IServices';
import {
  validateLoginBodyParams,
  validateCreateUserBody,
  validate,
} from '../../middleware/endpointValidator';
import { asyncWrapper } from '../../utils/asyncWrapper';
import { IExpressRequest } from '../../../../common/interfaces/IExpressRequest';

// eslint-disable-next-line new-cap
const router = express.Router({ mergeParams: true });

interface IAuthRouter {
  init(services: IServices): Router;
}

export const authRouter: IAuthRouter = {
  init(services: IServices) {
    router.post(
      '/register',
      validateCreateUserBody(),
      validate,
      asyncWrapper(async (req: IExpressRequest, res: Response) => {
        const user = await services.authService.register({
          name: req.body.name,
          surname: req.body.surname,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
        return res.send({
          data: user.toUserResponse(),
        });
      }),
    );

    router.post(
      '/login',
      validateLoginBodyParams(),
      validate,
      asyncWrapper(async (req: IExpressRequest, res: Response) => {
        const result = await services.authService.login(req.body.email, req.body.password);
        return res.send({
          data: {
            token: result.token,
            user: result.user.toUserResponse(),
          },
        });
      }),
    );

    return router;
  },
};
