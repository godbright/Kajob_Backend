export const createError = (req, res, next, status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  res.json(err);
  return next();
};
