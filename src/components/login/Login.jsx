"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function LoginUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div>
      <div className="flex justify-between mx-60 h-screen items-center">
        <div className="h-[700px]  w-[700px] ">
          <Image
            src="/assests/loginImage.png"
            alt="Side Illustration"
            height={700}
            width={700}
            className="object-cover w-full h-full"
          />
        </div>

        <div
          style={{
            background: "#FCFCFC3B",
            padding: 30,
            paddingBottom: 40,
            borderRadius: 15,
            maxWidth: 500,
            width: "100%",

            zIndex: 1,
            border: "2px solid #A92C2C",
            backdropFilter: "blur(10px)",
          }}
        >
          <div>
            <Image
              src="/assests/logo.png"
              height={150}
              width={200}
              className="m-2 mx-auto"
            ></Image>
          </div>
          <h2 className=" font-bold text-center mb-6 text-white">
            Welcome back! Inter you information
          </h2>
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
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-button text-white rounded-md"
            >
              Sign In
            </Button>

            {/* Links */}
            <div className="flex justify-between text-sm text-center mt-8">
              <Link href="/register" className="text-white hover:text-red-400">
                Create account
              </Link>
              <Link
                href="/forgot-password"
                className="text-white hover:text-red-400"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
