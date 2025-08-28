// Updated UserCreate Component
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRegisterMutation } from "@/redux/featured/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { registerSuccess, setError, clearError } from "@/redux/featured/auth/authSlice";
import { useRouter } from "next/navigation";
import { MainLogo } from "../share/svg/Logo";
import { toast } from "sonner";
// import { toast } from "react-hot-toast"; // Optional: for better UX

export default function UserCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError: setFormError,
    clearErrors,
  } = useForm();
  
  const [registerUser, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { error: authError } = useSelector((state) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState("");

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Handle auth errors
  useEffect(() => {
    if (authError) {
      setRegistrationStatus(authError.message || "Registration failed");
    }
  }, [authError]);

  const onSubmit = async (data) => {
    try {
      // Clear previous errors
      dispatch(clearError());
      setRegistrationStatus("");
      clearErrors();

      // Prepare registration data
      const registrationData = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        userName: data.userName.trim().toLowerCase(),
        email: data.email.trim().toLowerCase(),
        contact: data.contactNo.trim(),
        address: data.deliveryAddress.trim(),
        password: data.password,
      };

      console.log("Registering user with data:", {
        ...registrationData,
        password: "[HIDDEN]"
      });

      // Make registration API call
      const response = await registerUser(registrationData).unwrap();
      
      console.log("Registration response:", response);

      // Handle successful registration
      if (response.success) {
        // Dispatch success action
        dispatch(registerSuccess({
          user: response.user || null,
          accessToken: response.accessToken || response.token,
          email: registrationData.email,
        }));

        // Show success message
        setRegistrationStatus("Account created successfully!");
        toast?.success("Account created successfully!");

        // Redirect based on whether email verification is needed
        if (response.needsVerification || !response.accessToken) {
          // Needs email verification
          const email = encodeURIComponent(registrationData.email);
          router.push(`/otp-verify?email=${email}&type=registration`);
        } else {
          // Auto-login successful
          toast?.success("Welcome! You're now logged in.");
          router.push("/"); // or wherever you want to redirect
        }
      }
    } catch (error) {
      console.error("Registration failed:", error);
      
      // Handle different types of errors
      if (error.data) {
        const errorData = error.data;
        
        // Handle validation errors
        if (errorData.errors && Array.isArray(errorData.errors)) {
          errorData.errors.forEach(err => {
            if (err.field && err.message) {
              setFormError(err.field, { 
                type: "server", 
                message: err.message 
              });
            }
          });
        }
        
        // Handle specific error messages
        if (errorData.message) {
          if (errorData.message.includes("email")) {
            setFormError("email", { 
              type: "server", 
              message: "Email is already registered" 
            });
          } else if (errorData.message.includes("username")) {
            setFormError("username", { 
              type: "server", 
              message: "Username is already taken" 
            });
          }
          
          setRegistrationStatus(errorData.message);
          dispatch(setError(errorData));
        }
      } else {
        // Network or other errors
        const errorMessage = error.message || "Registration failed. Please try again.";
        setRegistrationStatus(errorMessage);
        dispatch(setError({ message: errorMessage }));
        toast?.error(errorMessage);
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center bg-black">
      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 ">
        <div className="rounded-lg p-2 xl:p-6 w-full mx-auto">
          <div className="flex justify-center mb-2lxl:mb-4">
            <MainLogo className="w-20 h-20" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-3 xl:mb-6 text-center text-white">
            Create an account
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="xl:space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm mb-2 text-white">
                First Name*
              </label>
              <p className="text-[12px] text-white mb-2">(Your First Name will be fully anonymous)</p>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters"
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "First name can only contain letters and spaces"
                  }
                })}
                className="w-full py-6 text-white border rounded-lg"
                disabled={isLoading}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm mb-2 text-white">
                Last Name*
              </label>
              <p className="text-[12px] text-white mb-2">(Your Last Name will be fully anonymous)</p>

              <Input
                id="lastName"
                placeholder="Enter your last name"
                {...register("lastName", { 
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters"
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Last name can only contain letters and spaces"
                  }
                })}
                className="w-full py-6 text-white border rounded-lg"
                disabled={isLoading}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label htmlFor="userName" className="block text-sm mb-2 text-white">
                Username*
              </label>
              <p className="text-[12px] text-white mb-2">(Your Username can be viewed by the public through the Leaderboard)</p>

              <Input
                id="userName"
                placeholder="Enter your username"
                {...register("userName", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username cannot exceed 20 characters"
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: "Username can only contain letters, numbers, and underscores",
                  },
                })}
                className="w-full py-6 text-white border rounded-lg"
                disabled={isLoading}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-white">
                Email Address*
              </label>
              <p className="text-[12px] text-white mb-2">(Your Email Address will be fully anonymous)</p>

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
                className="w-full py-6 text-white border rounded-lg"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contactNo" className="block text-sm mb-2 text-white">
                Contact Number*
              </label>
              <Input
                id="contactNo"
                placeholder="Enter your contact number"
                type="tel"
                {...register("contactNo", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^[0-9+\-\s()]+$/,
                    message: "Please enter a valid contact number",
                  },
                  minLength: {
                    value: 10,
                    message: "Contact number must be at least 10 digits",
                  },
                })}
                className="w-full py-6 text-white border rounded-lg"
                disabled={isLoading}
              />
              {errors.contactNo && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contactNo.message}
                </p>
              )}
            </div>

            {/* Delivery Address */}
            <div>
              <label htmlFor="deliveryAddress" className="block text-sm mb-2 text-white">
                Delivered to*
              </label>
              <textarea
                id="deliveryAddress"
                placeholder="Enter your delivery address"
                {...register("deliveryAddress", {
                  required: "Delivery address is required",
                  minLength: {
                    value: 10,
                    message: "Please provide a complete address",
                  },
                })}
                className="w-full py-3 px-3 text-white border rounded-lg resize-none"
                rows="1"
                disabled={isLoading}
              />
              {errors.deliveryAddress && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.deliveryAddress.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm mb-2 text-white">
                Password*
              </label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                    }
                  })}
                  className="w-full py-6 text-white border rounded-lg"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => togglePasswordVisibility("password")}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm mb-2 text-white">
                Confirm Password*
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === getValues("password") || "Passwords do not match",
                  })}
                  className="w-full py-6 text-white border rounded-lg"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 flex justify-center items-center">
              <Button
                type="submit"
                className="text-white border w-full md:w-60 lg:w-80 h-10 md:h-12 rounded-md my-2 md:my-3 lg:my-4 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </div>
                ) : (
                  "Create account"
                )}
              </Button>
            </div>
          </form>

          {registrationStatus && (
            <div className={`text-center xl:mt-4 px-3 rounded ${
              registrationStatus.includes("successfully") || registrationStatus.includes("created") 
                ? "text-green-500 bg-green-100/10" 
                : "text-red-500 bg-red-100/10"
            }`}>
              {registrationStatus}
            </div>
          )}

          <p className="text-sm md:text-base mt-4 text-center text-white">
            If you already have an account, please{" "}
            <Link
              className="text-white font-bold md:font-black md:text-2xl ml-1 hover:text-red-400 transition-colors"
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
