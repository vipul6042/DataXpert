// api.js
import express from "express";
import passport from "passport";
import { signup,login } from "../controllers/authController.js";
// import userController from "./userController.js";

const router = express.Router();

// Auth Routes
router.post("/signup", signup);
router.post("/login", login);
// router.get(
// 	"/google",
// 	passport.authenticate("google", { scope: ["profile", "email"] }),
// );
// router.get(
// 	"/google/callback",
// 	passport.authenticate("google", { failureRedirect: "/login" }),
// 	authController.googleCallback,
// );
// router.post("/forgot-password", authController.forgotPassword);
// router.post("/reset-password/:token", authController.resetPassword);

// User Routes
// router.get("/users", userController.getUsers);
// router.post("/users", userController.createUser);

export default router;
