const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const nodemailer = require("nodemailer");

const JWT_SECRET = "your_jwt_secret";

// User Signup
exports.signup = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		});
		res.status(201).json({ message: "User created successfully", user });
	} catch (error) {
		res.status(500).json({ error: "Error creating user" });
	}
};

// User Login
exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ where: { email } });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
			expiresIn: "1h",
		});
		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		res.status(500).json({ error: "Error logging in" });
	}
};

// Google OAuth Callback
exports.googleCallback = (req, res) => {
	const token = jwt.sign({ userId: req.user.id }, JWT_SECRET, {
		expiresIn: "1h",
	});
	res.redirect(`/dashboard?token=${token}`);
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ where: { email } });
		if (!user) return res.status(400).json({ error: "User not found" });

		const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
			expiresIn: "15m",
		});
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: { user: "your_email@gmail.com", pass: "your_email_password" },
		});

		const mailOptions = {
			from: "your_email@gmail.com",
			to: email,
			subject: "Password Reset",
			text: `Click this link to reset your password: http://localhost:3000/reset-password/${token}`,
		};

		await transporter.sendMail(mailOptions);
		res.status(200).json({ message: "Password reset email sent" });
	} catch (error) {
		res.status(500).json({ error: "Error sending password reset email" });
	}
};

// Reset Password
exports.resetPassword = async (req, res) => {
	const { token } = req.params;
	const { newPassword } = req.body;

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		const user = await User.findByPk(decoded.userId);
		if (!user) return res.status(400).json({ error: "Invalid token" });

		user.password = await bcrypt.hash(newPassword, 10);
		await user.save();
		res.status(200).json({ message: "Password reset successfully" });
	} catch (error) {
		res.status(500).json({ error: "Error resetting password" });
	}
};
