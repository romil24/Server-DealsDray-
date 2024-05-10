import { ApiError } from "./ApiError.js";

const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (err) {
      if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
          success: false,
          message: err.message,
          errors: err.errors,
        });
      } else {
        console.error("Unhandled error:", err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          errors: [],
        });
      }
    }
  };
};

export { asyncHandler };
