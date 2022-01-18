import { JwtPayload } from 'jsonwebtoken';

export interface IRequestUser {
  user?: JwtPayload;
}
