"use client";
import { Button } from "@/components/ui/button"; // Assuming you're using ShadCN's Button component
import { Input } from "@/components/ui/input"; // Assuming you're using ShadCN's Input component
import { Textarea } from "@/components/ui/textarea"; // Assuming you're using ShadCN's Textarea component
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa"; // Import React Icons

export default function ContactUs() {
  return (
    <div className="text-white  py-12 max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg mb-6">
              High there. We're here if you need us.
            </p>
            <h3 className="text-lg font-semibold mb-4">Ask Us Anything</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-lg" />
                <p className="text-sm">
                  No: 57A, East Madison street, Baltimore, MD , USA 4807
                </p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-lg" />
                <p className="text-sm">abc@gmail.com</p>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="mr-2 text-lg" />
                <p className="text-sm">+99-01548975148</p>
              </div>
            </div>
          </div>

          {/* Right Section (Contact Form) */}
          <div className="w-full md:w-1/2 bg-[#222] p-4 md:p-8 rounded-lg shadow-lg">
            <form className="space-y-12">
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-2">Full Name</label>
                    <Input
                      placeholder="Enter your full name"
                      className="w-full py-6 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Email Address</label>
                    <Input
                      placeholder="Enter your email address"
                      className="w-full py-6 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Address</label>
                    <Input
                      placeholder="Enter your Address"
                      className="w-full py-6 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Contact Number</label>
                    <Input
                      placeholder="Enter your contact number"
                      className="w-full py-6 text-black"
                    />
                  </div>
                </div>
                <label className="block text-sm mb-2 mt-4">Comments</label>
                <Textarea
                  placeholder="Write here...."
                  className="w-full h-24 text-black"
                />
              </div>
              <Button className="bg-button text-white w-full h-12 rounded-md">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
