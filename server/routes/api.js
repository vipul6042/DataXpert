// api.js
import express from "express";
import passport from "passport";
import {
	signup,
	login,
	enable2fa,
	verify2fa,
} from "../controllers/authController.js";
import {
	compute,
	search,
	getCompanyData,
} from "../controllers/computeController.js";

// import userController from "./userController.js";

const router = express.Router();

// Auth Routes
router.post("/signup", signup);
router.post("/login", login);
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] }),
);
// router.get(
// 	"/google/callback",
// 	passport.authenticate("google", { failureRedirect: "/login" }),
// 	authController.googleCallback,
// );
router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/fail" }),
	(req, res) => {
		// Successful authentication, redirect to dashboard or other page
		res.redirect("/");
	},
);
router.get("/enable-2fa", enable2fa);
router.post("/verify-2fa", verify2fa);
// router.post("/forgot-password", authController.forgotPassword);
// router.post("/reset-password/:token", authController.resetPassword);

// User Routes
// router.get("/users", userController.getUsers);
// router.post("/users", userController.createUser);

// compute Routes
router.get("/compute/:code", compute);

// search route
router.get("/company/search",search);

// Company Data
router.get("/company/:sl_no", getCompanyData);

export default router;
