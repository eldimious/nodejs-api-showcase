import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import logging from '../../../common/logging';
import {
  USER_TOKEN_EXPIRATION,
  USER_ROLE,
} from '../../../common/constants';
import config from '../../../configuration';
import { Token } from '../../../domain/token/model';
import errors from '../../../common/errors';
import { User } from '../../../domain/users/model';
import { IAuthenticationRepository } from '../../../domain/auth/authenticationRepository';

const SALT_ROUNDS = 10;

interface IAuthenticationRepositoryFactory {
  init(): IAuthenticationRepository;
}

export const authenticationRepositoryFactory: IAuthenticationRepositoryFactory = {
  init(): IAuthenticationRepository {
    async function comparePassword(password: string, dbPassword: string): Promise<boolean> {
      try {
        const match = await bcrypt.compare(password, dbPassword);
        if (!match) {
          throw new Error('Authentication error');
        }
        return match;
      } catch (error) {
        throw new errors.Unauthorized('Wrong password.');
      }
    }

    async function hashPassword(password: string): Promise<string> {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      return bcrypt.hash(password, salt);
    }

    async function createUserToken(user: User): Promise<Token> {
      logging.info('Create consultant token called');
      const jwtSecret = config.jwtSecret as string;
      const token = {
        accessToken: jwt.sign({
          email: user.email,
          fullName: user.fullName,
          _id: user.id,
          roles: [USER_ROLE],
        }, jwtSecret, {
          expiresIn: USER_TOKEN_EXPIRATION,
        }),
        tokenType: 'Bearer',
        roles: [USER_ROLE],
        expiresIn: USER_TOKEN_EXPIRATION,
      };
      return new Token(token.accessToken, token.tokenType, token.expiresIn, token.roles);
    }

    async function verifyToken(token: string, secret: string): Promise<JwtPayload> {
      return jwt.verify(token, secret);
    }

    return {
      createUserToken,
      verifyToken,
      comparePassword,
      hashPassword,
    };
  },
};
