"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

export default function UserCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registrationStatus, setRegistrationStatus] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    setRegistrationStatus("Account created successfully!");
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row  justify-center">
      {/* Left side image - hidden on small devices */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center ">
        <div className="h-auto max-h-[900px] w-full max-w-[900px] p-4">
          <Image
            src="/assests/registerImage.png"
            alt="Side Illustration"
            width={900}
            height={700}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>

      {/* Right side form - full width on small devices */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="bg-[#FCFCFC3B] border-2 border-[#A92C2C] backdrop-blur-md rounded-lg p-6 md:p-8 w-full max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <Image
              src="/assests/logo.png"
              height={120}
              width={160}
              alt="Logo"
              className="mx-auto"
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Create an account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm mb-2">
                Full Name*
              </label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                {...register("fullName", { required: "Full Name is required" })}
                className="w-full py-6 text-black bg-white border border-[#2E2E2EF5] rounded-lg"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm mb-2">
                Email Address*
              </label>
              <Input
                id="email"
                placeholder="Enter your email address"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className="w-full py-6 text-black bg-white border border-[#2E2E2EF5] rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm mb-2">
                Password*
              </label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
                className="w-full py-6 text-black bg-white border border-[#2E2E2EF5] rounded-lg"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-button text-white w-full h-10 md:h-12 rounded-md my-4 md:my-6"
            >
              Create account
            </Button>
          </form>

          {registrationStatus && (
            <p className="text-center mt-4 text-green-500">
              {registrationStatus}
            </p>
          )}

          <p className="text-sm md:text-base mt-4 text-center">
            If you already have an account, please{" "}
            <Link
              className="text-white font-bold md:font-black md:text-2xl ml-1"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
