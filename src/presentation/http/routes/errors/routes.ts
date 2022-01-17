import { Response, NextFunction } from 'express';
import errors from '../../../../common/errors';
import { IExpressRequest } from '../../../../common/interfaces/IExpressRequest';

const createResponseError = (err: any) => ({
  status: err.status,
  data: {
    code: err.code,
    message: err.message,
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: any, req: IExpressRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> {
  if (errors.isCustomError(err)) {
    return res.status(err.status).send(createResponseError(err));
  }
  const internalError = new errors.InternalServerError(err.message);
  return res.status(internalError.status).send(createResponseError(internalError));
}
