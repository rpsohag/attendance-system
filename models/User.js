import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: (e) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e);
      },
    },
    message: (prop) => {
      return `Invalid Email Address: ${prop.value}`;
    },
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
  },
  roles: {
    type: [String],
    enum: ["ADMIN", "STUDENT"],
    default: ["STUDENT"],
  },
  accountStatus: {
    type: String,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: "PENDING",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
