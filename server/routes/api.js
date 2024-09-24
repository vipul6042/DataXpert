// api.js
const express = require("express");
const passport = require("passport");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const router = express.Router();

// Auth Routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/login" }),
	authController.googleCallback,
);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

// User Routes
router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);

module.exports = router;
