import gendrateToken from "../utils/gendrateToken";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import cloudinary from "../lib/cloudinary";
import { Request, Response } from "express";

interface AuthRequest extends Request {
  user?: Iuser & { _id: string };
}

export const signUp = async (req: Request, res: Response) => {
  try {
    const { userName, password, email } = req.body as {
      userName: string;
      password: string;
      email: string;
    };
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {email:string , password:string};
    const user = await User.findOne({ email });
    const isPassword = user && (await bcrypt.compare(password, user.password || ""));
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

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Succesfully" });
  } catch (error) {
    console.log(`Error in logoutController ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user?._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profilepic is requried" });
    }
    const uploaderResponse = await cloudinary.uploader.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploaderResponse.secure_url },
      { new: true }
    );
    res.status(200).json({ updateUser });
  } catch (error) {
    console.log(`Error in updateprofileController ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.user?._id }).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log(`Error in getMeController ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
