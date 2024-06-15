import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;
  if (
    [fullName, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  const avatarLocalPAth = req.files?.avatar[0]?.path;
  const coverImageLocalPAth = req.files?.coverImage[0]?.path;
  if (!avatarLocalPAth) {
    throw new ApiError(400, "Avatar file is required");
  }
  const avatar = await uploadCloudinary(avatarLocalPAth);
  const coverImage = await uploadCloudinary(coverImageLocalPAth);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id);
  if (!createdUser) {
    throw new ApiError(500, "error while registering user!");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully !"));
});

export { registerUser };
