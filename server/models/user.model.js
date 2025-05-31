import mongoose from "mongoose";

const UserSchma = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      requried: true,
      minlength: [6, "password should be 6 character"],
    },
    email: {
      type: String,
      requried: true,
      unique: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  
  { timestamps: true }
);

const User = mongoose.model("User", UserSchma);

export default User;
