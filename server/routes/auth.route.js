import express from "express";
import {
  login,
  signUp,
  logout,
  getMe,
  updateProfile,
} from "../controllers/auth.controller.js";
import productRoute from "../middlewere/auth.middlewere.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", productRoute, getMe);
router.put("/update-profile", productRoute, updateProfile);

export default router;
