export const notFoundErrorHandle = (_req, _res, next) => {
  const error = new Error("Resource Not Found");
  error.status = 404;
  next(error);
};

export const globalErrorHandle = (err, _req, res, _next) => {
  return res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  });
};
