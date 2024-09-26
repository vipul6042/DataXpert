"use client";
import Link from "next/link";
import { useFormik } from "formik";
import { loginSchema } from "@/validation/schemas";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialValues = {
	email: "",
	password: "",
};

const Login = () => {
	const [serverErrorMessage, setServerErrorMessage] = useState("");
	const [serverSuccessMessage, setServerSuccessMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const { values, errors, handleChange, handleSubmit } = useFormik({
		initialValues,
		validationSchema: loginSchema,
		onSubmit: async (values, action) => {
			setLoading(true);
			try {
				const response = await fetch("http://localhost:4000/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				});

				const data = await response.json();

				if (response.ok) {
					setServerSuccessMessage("Login successful");
					setServerErrorMessage("");
					action.resetForm();
					localStorage.setItem("token", data.token); // Save token if needed
					setLoading(false);
					router.push("/"); // Redirect to user profile
				} else {
					setServerErrorMessage(data.error || "Invalid credentials");
					setServerSuccessMessage("");
					setLoading(false);
				}
			} catch (error) {
				setServerErrorMessage("Error logging in");
				setServerSuccessMessage("");
				setLoading(false);
			}
		},
	});

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="email" className="block font-medium mb-2">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={values.email}
							onChange={handleChange}
							className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
							placeholder="Enter your email"
						/>
						{errors.email && (
							<div className="text-sm text-red-500 px-2">{errors.email}</div>
						)}
					</div>
					<div className="mb-6">
						<label htmlFor="password" className="block font-medium mb-2">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={values.password}
							onChange={handleChange}
							className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
							placeholder="Enter your password"
						/>
						{errors.password && (
							<div className="text-sm text-red-500 px-2">{errors.password}</div>
						)}
					</div>
					<p className="text-sm text-gray-600 p-1">
						<Link
							href="/account/reset-password-link"
							className="text-indigo-500 hover:text-indigo-600 transition duration-300 ease-in-out"
						>
							Forgot Password?
						</Link>
					</p>
					<button
						type="submit"
						className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-400"
						disabled={loading}
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>
				<p className="text-sm text-gray-600 p-1">
					Not a User?{" "}
					<Link
						href="/auth/register"
						className="text-indigo-500 hover:text-indigo-600 transition duration-300 ease-in-out"
					>
						Create an account
					</Link>
				</p>
				{serverSuccessMessage && (
					<div className="text-sm text-green-500 font-semibold px-2 text-center">
						{serverSuccessMessage}
					</div>
				)}
				{serverErrorMessage && (
					<div className="text-sm text-red-500 font-semibold px-2 text-center">
						{serverErrorMessage}
					</div>
				)}
			</div>
		</div>
	);
};

export default Login;
