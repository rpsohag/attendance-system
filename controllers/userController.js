import User from "../models/User.js";
import { registerService } from "../services/authService.js";
import {
  findUser,
  findUserByProperty,
  updateUser,
} from "../services/userService.js";
import errorResponse from "../utils/errorResponse.js";

export const getAllUser = async (req, res, next) => {
  try {
    const users = await findUser();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, email, roles, accountStatus } = req.body;
  try {
    const user = await updateUser(userId, {
      name,
      email,
      roles,
      accountStatus,
    });
    return res.status(200).json({
      message: "User successfully updated",
      user,
    });
  } catch (error) {
    next(error);
  }
};
export const patchUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, roles, accountStatus } = req.body;
  try {
    const user = await findUserByProperty("_id", userId);
    if (!user) {
      throw errorResponse("User Not Found", 400);
    }
    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;
    await user.save();
    return res.status(200).json({
      message: "User successfully updated",
      user,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await findUserByProperty("_id", userId);
    if (!user) {
      throw errorResponse("User not found", 400);
    }
    user.deleteOne();
    return res.status(200).json({
      message: "User successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;
  try {
    const user = await registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    return res.status(201).json({
      message: "User successfully created",
      user,
    });
  } catch (error) {
    next(error);
  }
};
