"use client";

import React, { useState } from "react";
import Link from "next/link";
const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="bg-white shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<div className="flex-shrink-0">
						<a href="/" className="text-2xl font-bold text-black">
							DataXpert
						</a>
					</div>

					{/* Desktop Menu */}
					<div className="hidden md:flex space-x-6">
						<a href="#home" className="text-gray-700 hover:text-blue-500">
							Home
						</a>
						<a href="#features" className="text-gray-700 hover:text-blue-500">
							Features
						</a>
						<a href="#downloads" className="text-gray-700 hover:text-blue-500">
							Profile
						</a>
						<a href="#plans" className="text-gray-700 hover:text-blue-500">
							Settings
						</a>
					</div>

					{/* Buttons */}
					<div className="hidden md:flex space-x-4">
						<button className="py-2 px-4 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition">
							<Link href="/auth/register">Sign Up</Link>
						</button>
						<button className="py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition">
							<Link href="/auth/login">Login</Link>
						</button>
					</div>

					{/* Mobile Menu Icon */}
					<div className="md:hidden flex items-center">
						<button
							className="outline-none text-gray-800"
							onClick={() => setIsOpen(!isOpen)}
						>
							{isOpen ? (
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									></path>
								</svg>
							) : (
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									></path>
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<div className="md:hidden">
					<div className="flex flex-col space-y-2 px-4 py-2">
						<a href="#home" className="text-gray-700 hover:text-blue-500">
							Home
						</a>
						<a href="#features" className="text-gray-700 hover:text-blue-500">
							Features
						</a>
						<a href="#downloads" className="text-gray-700 hover:text-blue-500">
							Profile
						</a>
						<a href="#plans" className="text-gray-700 hover:text-blue-500">
							Settings
						</a>
						<button className="py-2 px-4 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition">
							Sign Up
						</button>
						<button className="py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition">
							Login
						</button>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
