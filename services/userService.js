import User from "../models/User.js";

export const findUser = () => {
  return User.find();
};

export const findUserByProperty = (key, value) => {
  if (key == "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

export const createUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : ["STUDENT"],
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });
  console.log("okkkk");
  return user.save();
};
