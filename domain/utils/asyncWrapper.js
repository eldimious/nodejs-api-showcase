const asyncWrapper = fn =>
  (req, res, next, ...args) =>
    fn(req, res, next, ...args)
      .catch(error => next(error));

module.exports = asyncWrapper;
