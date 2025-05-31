import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const productRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
  
    if (!token) {
      res.status(400).json({ message: "Token Not Found" });
    }
    const decoded = jwt.verify(token,process.env.JWT_SECREATE);
    if (!decoded) {
      res.status(400).json({ message: "Invailed Token" });
    }
    const user = await User.findOne({ _id: decoded.userId }).select("password");
    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in productRoute ${error}`);
    res.status(500).json({ message: "internal server error" });
  }
};

export default productRoute;
