function getRetryAfterSeconds(msBeforeNext) {
  return Math.round(msBeforeNext / 1000) || 1;
}

module.exports = {
  getRetryAfterSeconds,
};
