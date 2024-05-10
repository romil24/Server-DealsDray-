class ApiError extends Error {
  constructor(statusCode, message = "Something Wrong ", errors = [], stack) {
    super(message), (this.message = message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  // Set the status code
  res.status(err.statusCode || 500);

  // Respond with JSON
  res.json({
    success: false,
    message: err.message || "Something went wrong",
    errors: err.errors || [],
  });
}

export { ApiError, errorHandler };
