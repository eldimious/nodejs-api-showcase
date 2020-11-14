// DOMAIN LAYER
// Has the userRepository as a dependency. The authService does not know
// nor does it care where the user models came from. This is abstracted away
// by the implementation of the repositories. It just calls the needed repositories
// gets the results and usually applies some business logic on them.
function init({
  authenticationRepository,
  usersRepository,
}) {
  async function register(options) {
    return usersRepository.createUser(options);
  }

  async function login(options) {
    try {
      const user = await usersRepository.getUser(options);
      await authenticationRepository.comparePassword(options.password, user.password);
      const token = await authenticationRepository.createUserToken(user);
      return {
        token,
        user,
      };
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
