import gendrateToken from "../utils/gendrateToken.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const signUp = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "Please Login" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(404).json({ message: "Email already taken" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be atleast 6 character" });
    }
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      userName: userName,
      password: hasedPassword,
      email: email,
    });
    await newUser.save();
    gendrateToken(newUser._id, res);
    return res.status(201).json({
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
    });
  } catch (error) {
    console.log(`Error in signUpController ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPassword = await bcrypt.compare(password, user.password || "");
    if ((!user, !isPassword)) {
      return res.status(404).json({ message: "invaild username or password" });
    }
    gendrateToken(user._id, res);
    res.status(200).json({
      userName: user.userName,
      email: user.email,
    });
  } catch (error) {
    console.log(`Error in loginController ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Succesfully" });
  } catch (error) {
    console.log(`Error in logoutController ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profilepic is requried" });
    }
    const uploaderResponce = await cloudinary.uploader.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploaderResponce.secure_url },
      { new: true }
    );
    res.status(200).json({ updateUser });
  } catch (error) {
    console.log(`Error in updateprofileController ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log(`Error in getMeController ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
