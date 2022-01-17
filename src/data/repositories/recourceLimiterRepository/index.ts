import Redis from 'ioredis';
import { RateLimiterRedis, RateLimiterRes } from 'rate-limiter-flexible';
import config from '../../../configuration';
import {
  MAX_CONSECUTIVE_FAILS_BY_USERNAME,
} from '../../../common/constants';

export interface IRecourceLimiterRepository {
  maxConsecutiveFailsByUsername: number;
  getUserKeyForFailedLogin: (usernameKey: string) => Promise<RateLimiterRes | null>;
  consumeUserPointsForFailedLogin: (usernameKey: string) => Promise<RateLimiterRes>;
  deleteUserKeyForFailedLogin: (usernameKey: string) => Promise<boolean>
}

interface IRecourceLimiterRepositoryFactory {
  init(): IRecourceLimiterRepository;
}

export const recourceLimiterRepositoryFactory: IRecourceLimiterRepositoryFactory = {
  init(): IRecourceLimiterRepository {
    const redisClient = new Redis(config.redis.uri, { enableOfflineQueue: false });

    const limiterUserConsecutiveFailsByUsername = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'login_fail_consecutive_username_user',
      points: MAX_CONSECUTIVE_FAILS_BY_USERNAME,
      duration: 60 * 10, // Store number for 10 minutes since first fail(ttl)
      blockDuration: 60 * 10, // Block for 10mnts
    });

    return {
      maxConsecutiveFailsByUsername: MAX_CONSECUTIVE_FAILS_BY_USERNAME,
      getUserKeyForFailedLogin: async (usernameKey: string) => limiterUserConsecutiveFailsByUsername.get(usernameKey),
      consumeUserPointsForFailedLogin: async (usernameKey: string) => limiterUserConsecutiveFailsByUsername.consume(usernameKey),
      deleteUserKeyForFailedLogin: async (usernameKey: string) => limiterUserConsecutiveFailsByUsername.delete(usernameKey),
    };
  },
};
