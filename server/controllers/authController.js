import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import nodemailer from "nodemailer";

// Signup Controller
export const signup = async (req, res) => {
	const { username, email, password } = req.body;

	// Validate incoming request data
	if (!username || !email || !password) {
		return res.status(400).json({ message: "All fields are required." });
	}

	try {
		// Check if user with the same email or username already exists
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res
				.status(409)
				.json({ message: "User already exists with this email." });
		}

		// Hash the password
		const saltRounds = 10;
		const password_hash = await bcrypt.hash(password, saltRounds);

		// Create a new user in the database
		const newUser = await User.create({
			username,
			email,
			password_hash,
		});

		// Respond with success
		return res.status(201).json({
			message: "User created successfully.",
			user: {
				id: newUser.id,
				username: newUser.username,
				email: newUser.email,
			},
		});
	} catch (error) {
		// Handle any errors during user creation
		return res
			.status(500)
			.json({ message: "Error creating user.", error: error.message });
	}
};

// // User Login
export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ where: { email } });
		console.log(process.env.JWT_SECRET);

		if (!user || !(await bcrypt.compare(password, user.password_hash))) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		res.status(500).json({ error: "Error logging in" });
	}
};

export const enable2fa = async (req, res) => {
	// Get the authenticated user from session or request
	const user = req.user;

	const generate2FASecret = (user) => {
		const secret = speakeasy.generateSecret({
			name: `MyApp (${User.email})`, // App name with user's email or username
		});

		// Save this `secret.base32` value to the user's database profile
		User.two_factor_secret = secret.base32; // Save base32 secret in database

		return secret;
	};

	const generateQRCode = async (secret) => {
		try {
			const qrCodeImageUrl = await qrcode.toDataURL(secret.otpauth_url);
			return qrCodeImageUrl; // Return the QR Code Image URL
		} catch (err) {
			console.error("Error generating QR code", err);
		}
	};

	// Generate a new 2FA secret for the user
	const secret = generate2FASecret(user);

	// Generate QR code for scanning
	const qrCode = await generateQRCode(secret);

	// Send the QR code to the front end to display for the user to scan
	res.send({ qrCode });

	// Save the user's secret to the database
	// await user.save();
};

export const verify2fa = async (req, res) => {
	const { token } = req.body; // Token sent by user
	const user = req.user; // Assuming user is already authenticated and available in req.user

	// Verify the provided token against the stored secret
	const verified = speakeasy.totp.verify({
		secret: user.twoFactorSecret, // Use the stored secret from the user's profile
		encoding: "base32",
		token: token, // The token submitted by the user
		window: 1, // Tolerance for time differences (optional)
	});

	if (verified) {
		res.send({ success: true, message: "2FA verified!" });
	} else {
		res.status(400).send({ success: false, message: "Invalid 2FA token" });
	}
};
// // Google OAuth Callback
// exports.googleCallback = (req, res) => {
// 	const token = jwt.sign({ userId: req.user.id }, JWT_SECRET, {
// 		expiresIn: "1h",
// 	});
// 	res.redirect(`/dashboard?token=${token}`);
// };

// // Forgot Password
// exports.forgotPassword = async (req, res) => {
// 	const { email } = req.body;

// 	try {
// 		const user = await User.findOne({ where: { email } });
// 		if (!user) return res.status(400).json({ error: "User not found" });

// 		const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
// 			expiresIn: "15m",
// 		});
// 		const transporter = nodemailer.createTransport({
// 			service: "gmail",
// 			auth: { user: "your_email@gmail.com", pass: "your_email_password" },
// 		});

// 		const mailOptions = {
// 			from: "your_email@gmail.com",
// 			to: email,
// 			subject: "Password Reset",
// 			text: `Click this link to reset your password: http://localhost:3000/reset-password/${token}`,
// 		};

// 		await transporter.sendMail(mailOptions);
// 		res.status(200).json({ message: "Password reset email sent" });
// 	} catch (error) {
// 		res.status(500).json({ error: "Error sending password reset email" });
// 	}
// };

// // Reset Password
// exports.resetPassword = async (req, res) => {
// 	const { token } = req.params;
// 	const { newPassword } = req.body;

// 	try {
// 		const decoded = jwt.verify(token, JWT_SECRET);
// 		const user = await User.findByPk(decoded.userId);
// 		if (!user) return res.status(400).json({ error: "Invalid token" });

// 		user.password = await bcrypt.hash(newPassword, 10);
// 		await user.save();
// 		res.status(200).json({ message: "Password reset successfully" });
// 	} catch (error) {
// 		res.status(500).json({ error: "Error resetting password" });
// 	}
// };
