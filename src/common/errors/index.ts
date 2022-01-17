import throwHttpErrors from 'throw-http-errors';

const isCustomError = (error: any): boolean => {
  if (Object.keys(throwHttpErrors).includes(error.name) || (error.status && Object.keys(throwHttpErrors).includes(error.status.toString()))) {
    return true;
  }
  return false;
};

// eslint-disable-next-line prefer-object-spread
export default Object.assign(
  {},
  throwHttpErrors,
  {
    isCustomError,
  },
);
