"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; 
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import Link from "next/link";

export default function LoginUser() {
  const [showPassword, setShowPassword] = useState(false); 
  const [rememberPassword, setRememberPassword] = useState(false); 

  const handleTogglePassword = () => setShowPassword((prev) => !prev); 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send the data to the backend)
    console.log("Form submitted");
  };

  return (
    <div className=" text-white flex justify-center items-center py-12">
      <div className="max-w-md w-full px-6 py-8 bg-[#222] rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* User Name or Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-2">
              User name or email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full py-6 text-white"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full py-6 text-black"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white "
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember Password */}
          <div className="flex items-center mb-4">
            <Checkbox
              id="rememberPassword"
              checked={rememberPassword}
              onChange={() => setRememberPassword((prev) => !prev)}
              className="mr-2"
            />
            <label htmlFor="rememberPassword" className="text-sm">
              Remember password
            </label>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-button  text-white rounded-md"
          >
            Sign In
          </Button>

          {/* Links */}
          <div className="flex justify-between text-sm text-center mt-4">
            <Link
              href="/user-create"
              className="text-red-500 hover:text-red-400"
            >
              Create account
            </Link>
            <Link
              href="/auth/forgot-password"
              className="text-red-500 hover:text-red-400"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
