const Redis = require('ioredis');
const { RateLimiterRedis } = require('rate-limiter-flexible');
const {
  redis: redisConfig,
} = require('../../../configuration');
const {
  MAX_CONSECUTIVE_FAILS_BY_USERNAME,
} = require('../../../common/constants');

module.exports.init = function init() {
  const redisClient = new Redis(redisConfig.uri, { enableOfflineQueue: false });

  const limiterUserConsecutiveFailsByUsername = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'login_fail_consecutive_username_user',
    points: MAX_CONSECUTIVE_FAILS_BY_USERNAME,
    duration: 60 * 10, // Store number for 10 minutes since first fail(ttl)
    blockDuration: 60 * 10, // Block for 10mnts
  });

  return {
    maxConsecutiveFailsByUsername: MAX_CONSECUTIVE_FAILS_BY_USERNAME,
    getUserKeyForFailedLogin: async (usernameKey) => limiterUserConsecutiveFailsByUsername.get(usernameKey),
    consumeUserPointsForFailedLogin: async (usernameKey) => limiterUserConsecutiveFailsByUsername.consume(usernameKey),
    deleteUserKeyForFailedLogin: async (usernameKey) => limiterUserConsecutiveFailsByUsername.delete(usernameKey),
  };
};
