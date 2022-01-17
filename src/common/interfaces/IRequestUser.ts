import { JwtPayload } from 'jsonwebtoken';

export interface IRequestId {
  user?: JwtPayload;
}
