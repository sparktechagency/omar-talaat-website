"use client";
import { useState } from "react";
import { useForm } from "react-hook-form"; // Importing react-hook-form
import { Button } from "@/components/ui/button"; // Assuming you're using ShadCN's Button component
import { Input } from "@/components/ui/input"; // Assuming you're using ShadCN's Input component
import { FaShoppingCart, FaRegStar } from "react-icons/fa"; // Icons for features like easy checkout, track orders
import Link from "next/link";

export default function UserCreate() {
  // Form handling with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registrationStatus, setRegistrationStatus] = useState("");

  // Simple user registration function (replace with actual logic in production)
  const onSubmit = (data) => {
    console.log(data);
    setRegistrationStatus("Account created successfully!");
  };

  return (
    <div className=" text-white  py-12">
      <div className="container mx-auto px-4">
        {/* Form Section */}
        <div className="max-w-xl mx-auto bg-[#222] p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-6 text-center">
            Create an account
          </h2>
          <p className="text-sm text-center mb-6">
            Password must have 8 characters
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm mb-2">
                Full Name*
              </label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                {...register("fullName", { required: "Full Name is required" })}
                className="w-full py-6 text-black"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs">
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
                className="w-full py-6 text-black"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
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
                className="w-full py-6 text-black"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Signup Benefits */}
            <div className="flex flex-col items-center mt-6">
              <p className="text-yellow-400 font-semibold mb-4">
                <FaRegStar className="inline-block mr-2" />
                Signup and earn 50 points!
              </p>

              <div className="grid grid-cols-2 gap-x-12 gap-y-6 md:gap-x-20 text-sm text-white mb-6">
                <div className="flex items-center gap-2">
                  <FaShoppingCart />
                  <span>Easy Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegStar />
                  <span>Order History</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaShoppingCart />
                  <span>Track Orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegStar />
                  <span>Earn Discounts</span>
                </div>
              </div>

              <p className="text-xs text-center text-gray-400">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our privacy policy.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-button text-white w-full h-12 rounded-md my-6"
            >
              Create account
            </Button>
          </form>

          {registrationStatus && (
            <p className="text-center mt-4 text-green-500">
              {registrationStatus}
            </p>
          )}
          <p>
            If your already have a account please{" "}
            <Link className="text-blue-600 font-black text-2xl ml-2" href="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
