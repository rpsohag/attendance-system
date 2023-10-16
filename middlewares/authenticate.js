import jwt from "jsonwebtoken";
import errorResponse from "../utils/errorResponse.js";
import User from "../models/User.js";

const authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      throw errorResponse("You are unauthorized", 400);
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
