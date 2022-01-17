import { Response, NextFunction } from 'express';
import errors from '../../../common/errors';
import authenticationRepositoryFactory from '../../../data/repositories/authenticationRepository';
import config from '../../../configuration';
import { IExpressRequest } from '../../../common/interfaces/IExpressRequest';

const authentication = authenticationRepositoryFactory.init();

const getJWTFromAuthHeader = function getJWTFromAuthHeader(req: IExpressRequest) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    throw new errors.Unauthorized('Invalid user token', 'INVALID_TOKEN');
  }
  return authHeader.includes('Bearer') ? authHeader.split(' ').pop() : authHeader;
};

export const authenticateEndpoint = () => async (req: IExpressRequest, _res: Response, next: NextFunction) => {
  try {
    const token = getJWTFromAuthHeader(req);
    const decoded = await authentication.verifyToken(token as string, config.jwtSecret as string);
    req.user = decoded;
    return next();
  } catch (error) {
    return next(new errors.Unauthorized('Invalid user token', 'INVALID_TOKEN'));
  }
};
