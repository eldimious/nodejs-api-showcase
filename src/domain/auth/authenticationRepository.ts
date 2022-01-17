import { JwtPayload } from 'jsonwebtoken';
import { Token } from '../token/model';
import { User } from '../users/model';

export interface IAuthenticationRepository {
  comparePassword(password: string, dbPassword: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
  createUserToken(user: User): Promise<Token>;
  verifyToken(token: string, secret: string): Promise<JwtPayload>
}
