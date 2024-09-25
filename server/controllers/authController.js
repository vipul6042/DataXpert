import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
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
            return res.status(409).json({ message: "User already exists with this email." });
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
        return res.status(500).json({ message: "Error creating user.", error: error.message });
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
