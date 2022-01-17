function getRetryAfterSeconds(msBeforeNext: number): number {
  return Math.round(msBeforeNext / 1000) || 1;
}

export {
  getRetryAfterSeconds,
};
