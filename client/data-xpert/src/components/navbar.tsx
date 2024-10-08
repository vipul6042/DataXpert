"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AccountCircle } from '@mui/icons-material'; // Material UI profile icon
import { IconButton } from '@mui/material';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // To handle dropdown visibility
  const user = localStorage.getItem("user_id");
  useEffect(() => {
    // Check if user is logged in (by checking token or user data in localStorage)
    
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage and update state
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    setDropdownOpen(false); // Close dropdown after logout
  };

  return (
    <nav className="bg-white shadow-md">
      <div className=" mx-auto px-10 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-black px-[35px]">
              DataXpert
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-500">
              Home
            </a>
            {isLoggedIn?(
				<a href={`/history/${user}`} className="text-gray-700 hover:text-blue-500">
				History
			  </a>
			):null}
            <a href="#downloads" className="text-gray-700 hover:text-blue-500">
              Profile
            </a>
            <a href="#plans" className="text-gray-700 hover:text-blue-500">
              Settings
            </a>
          </div>

          {/* Buttons */}
          {isLoggedIn ? (
            <div className="relative">
              {/* Profile button */}
              <IconButton
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white"
              >
                <AccountCircle fontSize="large" />
              </IconButton>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2">
                  {/* <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link> */}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex space-x-4">
              <button className="py-2 px-4 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition">
                <Link href="/auth/register">Sign Up</Link>
              </button>
              <button className="py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition">
                <Link href="/auth/login">Login</Link>
              </button>
            </div>
          )}
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
