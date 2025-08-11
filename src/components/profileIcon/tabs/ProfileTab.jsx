"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { useGetMyProfileQuery, useUpdateProfileMutation } from "@/redux/featured/auth/authApi";
import { imageUrl } from "@/redux/baseUrl/baseUrl";
import { toast } from "sonner";

export default function ProfileTab() {
  const { data, isFetching } = useGetMyProfileQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const profileData = data?.data || {};

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    contact: "",
    address: "",
    deliverTo: "",
  });

  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFormValues({
      firstName: profileData?.firstName || "",
      lastName: profileData?.lastName || "",
      userName: profileData?.userName || "",
      email: profileData?.email || "",
      contact: profileData?.contact || "",
      address: profileData?.address || "",
      deliverTo: profileData?.deliverTo || "",
    });
  }, [profileData]);

  useEffect(() => {
    if (!selectedImageFile) return;
    const url = URL.createObjectURL(selectedImageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedImageFile]);

  const avatarSrc = useMemo(() => {
    if (previewUrl) return previewUrl;
    if (profileData?.image) {
      // Handle absolute vs relative
      const hasProtocol = /^https?:\/\//i.test(profileData.image);
      return hasProtocol ? profileData.image : `${imageUrl}${profileData.image.startsWith("/") ? "" : "/"}${profileData.image}`;
    }
    return "/assets/profile.png";
  }, [previewUrl, profileData]);

  const initials = useMemo(() => {
    const f = (formValues.firstName || "").charAt(0);
    const l = (formValues.lastName || "").charAt(0);
    return `${f}${l}`.toUpperCase() || "U";
  }, [formValues.firstName, formValues.lastName]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handlePickImage = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API expects multipart/form-data with `image` (optional) and `data` (JSON string)
      const { firstName, lastName, userName, email, contact, address, deliverTo } = formValues;
      const payload = { firstName, lastName, userName, email, contact, address };
      if (deliverTo) payload.deliverTo = deliverTo;

      const fd = new FormData();
      fd.append("data", JSON.stringify(payload));
      if (selectedImageFile) fd.append("image", selectedImageFile);

      const res = await updateProfile(fd).unwrap();
      if (res?.success) {
        toast.success("Profile updated successfully");
      } else {
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      console.error("Failed to update profile", err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-[60vh] overflow-y-auto"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#4B5563 transparent" }}
    >
      <style jsx>{`
        form::-webkit-scrollbar { width: 6px; }
        form::-webkit-scrollbar-track { background: transparent; }
        form::-webkit-scrollbar-thumb { background: #4B5563; border-radius: 3px; }
        form::-webkit-scrollbar-thumb:hover { background: #6B7280; }
      `}</style>

      <div className="flex justify-start mb-8">
        <div className="relative">
          <Avatar className="w-32 h-32">
            <AvatarImage src={avatarSrc} alt="Profile" />
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={handlePickImage}
            className="absolute bottom-0 right-0 rounded-full w-8 h-8"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-300">
            First name
          </Label>
          <p className="text-xs text-gray-400 mb-2">(Your First Name will be fully anonymous)</p>
          <Input
            id="firstName"
            placeholder="Emily Jane"
            value={formValues.firstName}
            onChange={handleChange}
            className="bg-transparent outline-none focus:outline-none focus:ring-0 border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-300">
            Last name
          </Label>
          <p className="text-xs text-gray-400 mb-2">(Your Last Name will be fully anonymous)</p>
          <Input
            id="lastName"
            placeholder="Emily Jane"
            value={formValues.lastName}
            onChange={handleChange}
            className="bg-transparent outline-none focus:outline-none focus:ring-0 border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="userName" className="text-sm font-medium text-gray-300">
          Username
        </Label>
        <p className="text-xs text-gray-400 mb-2">
          (Your Username can be viewed by the public through the Leaderboard)
        </p>
        <Input
          id="userName"
          placeholder="emilyjane"
          value={formValues.userName}
          onChange={handleChange}
          className="bg-transparent outline-none focus:outline-none focus:ring-0 border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-300">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="emily@gmail.com"
          value={formValues.email}
          onChange={handleChange}
          className="bg-transparent outline-none focus:outline-none focus:ring-0 border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact" className="text-sm font-medium text-gray-300">
          Contact number
        </Label>
        <Input
          id="contact"
          placeholder="+88-01846875456"
          value={formValues.contact}
          onChange={handleChange}
          className="bg-transparent outline-none focus:outline-none focus:ring-0 border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium text-gray-300">
          Deliver To
        </Label>
        <Input
          id="address"
          placeholder="Example location here"
          value={formValues.address}
          onChange={handleChange}
          className="bg-transparent outline-none focus:outline-none focus:ring-0 border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      {/* <div className="space-y-2">
        <Label htmlFor="shippingAddress" className="text-sm font-medium text-gray-300">
          Shipping address
        </Label>
        <Input
          id="shippingAddress"
          placeholder="Shipping address"
          value={formValues.shippingAddress}
          onChange={handleChange}
          className="bg-transparent outline-none focus:outline-none focus:ring-0 border-gray-600 text-white placeholder:text-gray-400"
        />
      </div> */}

      <Button
        type="submit"
        disabled={isLoading || isFetching}
        className="w-full bg-white text-black hover:bg-gray-200 font-medium py-5"
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}


