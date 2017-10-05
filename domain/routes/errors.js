function errorHandler(err, req, res, next) { //eslint-disable-line
  res.status(500);
  res.json({ error: err.message, status: 500 });
}

module.exports = errorHandler;
