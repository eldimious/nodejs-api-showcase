function asyncWrapper(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res);
      return;
    } catch (err) {
      next(err);
    }
  };
}

module.exports = asyncWrapper;
