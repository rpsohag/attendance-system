import { loginService, registerService } from "../services/authService.js";
import errorResponse from "../utils/errorResponse.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throw errorResponse("All fields are required!", 400);
    }
    const user = await registerService({ name, email, password });
    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw errorResponse("All fields are required", 400);
    }
    const token = await loginService({ email, password });
    return res.status(200).json({
      message: "Login Successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};
