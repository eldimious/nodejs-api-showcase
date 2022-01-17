import { Response, NextFunction } from 'express';
import { IExpressRequest } from '../../../common/interfaces/IExpressRequest';

export const asyncWrapper = (fn: any) => (req: IExpressRequest, res: Response, next: NextFunction, ...args: any[]) => fn(req, res, next, ...args)
  .catch((error: any) => next(error));
