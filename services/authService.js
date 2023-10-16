import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByProperty } from "./userService.js";
import errorResponse from "../utils/errorResponse.js";

export const registerService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  let user = await findUserByProperty("email", email);
  if (user) {
    throw errorResponse("User already exists", 400);
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);
  return createUser({ name, email, password: hashPass, roles, accountStatus });
};

export const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);

  if (!user) {
    throw errorResponse("Invlid credentials", 400);
  }
  const matchPass = await bcrypt.compareSync(password, user.password);
  if (!matchPass) {
    throw errorResponse("Invalid Credentials", 400);
  }
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
