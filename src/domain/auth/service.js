// DOMAIN LAYER
// Has the userRepository as a dependency. The authService does not know
// nor does it care where the user models came from. This is abstracted away
// by the implementation of the repositories. It just calls the needed repositories
// gets the results and usually applies some business logic on them.
const errors = require('../../common/errors');
const {
  getRetryAfterSeconds,
} = require('../../common/utils/helper');


function init({
  authenticationRepository,
  usersRepository,
  recourceLimiterRepository,
}) {
  const getUsernameKey = username => `${username}`;

  async function register(options) {
    return usersRepository.createUser(options);
  }

  async function handleIncorrectLoginPassword({
    usernameKey,
    user,
  }) {
    try {
      const promises = [];
      if (user) {
        promises.push(recourceLimiterRepository.consumeUserPointsForFailedLogin(usernameKey));
      }
      await Promise.all(promises);
      throw new errors.Unauthorized('WRONG_PASSWORD');
    } catch (rlRejected) {
      if (rlRejected instanceof Error) {
        throw rlRejected;
      } else {
        const retryAfterSecs = getRetryAfterSeconds(rlRejected.msBeforeNext);
        throw new errors.TooManyRequests(`Too Many Requests. Retry after ${String(retryAfterSecs)} seconds`);
      }
    }
  }

  async function handleCorrectLoginPassword({
    resUsername,
    usernameKey,
    user,
  }) {
    if (resUsername !== null && resUsername.consumedPoints > 0) {
      await recourceLimiterRepository.deleteUserKeyForFailedLogin(usernameKey);
    }
    const token = await authenticationRepository.createUserToken(user);
    return {
      token,
      user,
    };
  }

  async function login({
    email,
    password,
  }) {
    try {
      const usernameKey = getUsernameKey(email);
      const [
        resUsername,
      ] = await Promise.all([
        recourceLimiterRepository.getUserKeyForFailedLogin(usernameKey),
      ]);
      let retrySecs = 0;
      if (resUsername !== null && resUsername.consumedPoints > recourceLimiterRepository.maxConsecutiveFailsByUsername) {
        retrySecs = getRetryAfterSeconds(resUsername.msBeforeNext);
      }
      if (retrySecs > 0) {
        throw new errors.TooManyRequests(`Too Many Requests. Retry after ${String(retrySecs)} seconds`);
      } else {
        const user = await usersRepository.getUser({
          email,
          password,
        });
        const isPasswordCorrect = await authenticationRepository.comparePassword(password, user.password)
          .catch((err) => {
            console.error(`Error in authentication of user with email: ${email}`, err);
            return undefined;
          });
        if (!isPasswordCorrect) {
          return handleIncorrectLoginPassword({
            email,
            usernameKey,
            user,
          });
        }
        return handleCorrectLoginPassword({
          resUsername,
          usernameKey,
          user,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  return {
    register,
    login,
  };
}

module.exports.init = init;
