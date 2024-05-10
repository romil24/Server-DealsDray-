import { Admin } from "../model/Login.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      throw new ApiError(404, "Unauthorized request ");
    }
    // If token is from headers, remove "Bearer " prefix
    if (!req.cookies?.accessToken && req.header("Authorization")) {
      token = token.trim();
    }

    const DecodedTokenInformation = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
    );

    const user = Admin.findById(DecodedTokenInformation?._id).select("-f_Pwd");
    if (!user) {
      throw new ApiError(401, "Invalid Access Token ");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token ");
  }
});
