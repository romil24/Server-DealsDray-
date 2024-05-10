import { Admin } from "../model/Login.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await Admin.findById(userId);
    const accessToken = user.generateAccessToken();

    return { accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something Want wrong While Generate Access & Refresh Token",
    );
  }
};

const RegisterAdmin = asyncHandler(async (req, res) => {
  const { f_userName, f_Pwd } = req.body;
  console.log(f_userName, f_Pwd);
  if ([f_userName, f_Pwd].some((filed) => filed?.trim() === "")) {
    throw new ApiError(400, "All Field Required");
  }

  const existUser = await Admin.findOne({
    $or: [{ f_userName }],
  });
  if (existUser) {
    throw new ApiError(400, "User with This userName already exists");
  }
  const user = await Admin.create({
    f_userName,
    f_Pwd,
  });
  console.log("user", user);
  const createdUser = await Admin.findById(user._id).select("-f_Pwd");
  if (!createdUser) {
    throw new ApiError(500, "Something Went Wrong while register The user ");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "Register SuccessFully"));
});

const login = asyncHandler(async (req, res) => {
  // match success then generate token
  // store into cookies
  const { f_userName, f_Pwd } = req.body;
  if ([f_userName, f_Pwd].some((filed) => filed.trim() === "")) {
    return new ApiError(400, "ALl Field Required");
  }
  const user = await Admin.findOne({
    $or: [{ f_userName }],
  });

  if (!user) {
    throw new ApiError(404, "User Dose Not exist");
  }
  const isPasswordValid = await user.isCorrectPassword(f_Pwd);

  if (!isPasswordValid) {
    throw new ApiError(401, "Password Dose Not Match");
  }
  const { accessToken } = await generateAccessTokenAndRefreshToken(user._id);

  const loggedUser = await Admin.findById(user._id).select("-f_Pwd");

  // set cookies

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .json(
      new ApiResponse(
        200,
        { user: loggedUser, accessToken },
        "Login Success Fully",
      ),
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User LogOut SuccessFully "));
});
export { RegisterAdmin, login, logOutUser };
