// components/RegistrationForm.jsx

"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function WholesaleRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Here you would handle form submission - API calls, etc.
    console.log(data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "India",
    "Brazil",
    "Mexico",
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-12 rounded-2xl my-10  border border-[#2E2E2EF5] text-gray-200">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div>
            <Label htmlFor="fullName" className="text-sm font-medium">
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              className="mt-1 bg-black border-gray-700 text-gray-200 placeholder:text-gray-500"
              {...register("fullName", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="contactNumber" className="text-sm font-medium">
              Contact Number
            </Label>
            <Input
              id="contactNumber"
              placeholder="Enter your contact number"
              className="mt-1 bg-black border-gray-700 text-gray-200 placeholder:text-gray-500"
              {...register("contactNumber", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="mt-1 bg-black border-gray-700 text-gray-200 placeholder:text-gray-500"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
          </div>

          <div>
            <Label htmlFor="userName" className="text-sm font-medium">
              User Name
            </Label>
            <Input
              id="userName"
              placeholder="Enter your user name"
              className="mt-1 bg-black border-gray-700 text-gray-200 placeholder:text-gray-500"
              {...register("userName", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="companyName" className="text-sm font-medium">
              Company Name
            </Label>
            <Input
              id="companyName"
              placeholder="Enter your company name"
              className="mt-1 bg-black border-gray-700 text-gray-200 placeholder:text-gray-500"
              {...register("companyName", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="country" className="text-sm font-medium">
              Country
            </Label>
            <Select {...register("country", { required: true })}>
              <SelectTrigger className="w-full mt-1 bg-black border-gray-700 text-gray-200 placeholder:text-gray-500">
                <SelectValue placeholder="Select your country name" />
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-700 text-gray-200">
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="address" className="text-sm font-medium">
              Address
            </Label>
            <Input
              id="address"
              placeholder="Enter your address"
              className="mt-1 bg-black border-gray-700 text-gray-200 placeholder:text-gray-500"
              {...register("address", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="city" className="text-sm font-medium">
              City
            </Label>
            <Input
              id="city"
              placeholder="Town/city"
              className="mt-1 bg-black border-gray-700 text-gray-200 placeholder:text-gray-500"
              {...register("city", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="state" className="text-sm font-medium">
              State
            </Label>
            <Input
              id="state"
              placeholder="State / country"
              className="mt-1 bg-black border-gray-700 text-gray-200 placeholder:text-gray-500"
              {...register("state", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="postcode" className="text-sm font-medium">
              Postcode
            </Label>
            <Input
              id="postcode"
              placeholder="Postcode / Zip"
              className="mt-1 bg-black border-gray-700 text-gray-200 placeholder:text-gray-500"
              {...register("postcode", { required: true })}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="bg-button w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Register"}
        </Button>

        <div className="flex justify-between pt-2">
          <Button
            type="button"
            variant="ghost"
            className="bg-button"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="bg-button"
            onClick={() => (window.location.href = "/forgot-password")}
          >
            Lost Password
          </Button>
        </div>
      </form>
    </div>
  );
}
