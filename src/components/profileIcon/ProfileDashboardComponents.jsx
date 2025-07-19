"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { MainLogo } from '../share/svg/Logo';
import LeaderboardModal from "../navbar/LeaderBoard";

// Profile Tab Component with Scrolling
const ProfileTab = () => {
  return (
    <div className="space-y-6 max-h-[60vh] overflow-y-auto" style={{
      scrollbarWidth: 'thin',
      scrollbarColor: '#4B5563 transparent'
    }}>
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `}</style>
      {/* Profile Picture Section */}
      <div className="flex justify-start mb-8">
        <div className="relative">
          <Avatar className="w-32 h-32">
            <AvatarImage src="/assets/profile.png" alt="Profile" />
            <AvatarFallback className="text-2xl">EJ</AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-0 right-0 rounded-full w-8 h-8"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label
            htmlFor="firstName"
            className="text-sm font-medium text-gray-300"
          >
            First name
          </Label>
          <p className="text-xs text-gray-400 mb-2">
            (Your First Name will be fully anonymous)
          </p>
          <Input
            id="firstName"
            placeholder="Emily Jane"
            className="bg-transparent outline-none focus:outline-none focus:ring-0 border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="lastName"
            className="text-sm font-medium text-gray-300"
          >
            Last name
          </Label>
          <p className="text-xs text-gray-400 mb-2">
            (Your Last Name will be fully anonymous)
          </p>
          <Input
            id="lastName"
            placeholder="Emily Jane"
            className="bg-transparent outline-none focus:outline-none focus:ring-0 border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium text-gray-300">
          Username
        </Label>
        <p className="text-xs text-gray-400 mb-2">
          (Your Username can be viewed by the public through the Leaderboard)
        </p>
        <Input
          id="username"
          placeholder="Emily Jane"
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
          className="bg-transparent outline-none focus:outline-none focus:ring-0 border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact" className="text-sm font-medium text-gray-300">
          Contact number
        </Label>
        <Input
          id="contact"
          placeholder="+99-01846875456"
          className="bg-transparent outline-none focus:outline-none focus:ring-0 border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="deliverTo"
          className="text-sm font-medium text-gray-300"
        >
          Deliver To
        </Label>
        <Input
          id="deliverTo"
          placeholder="example Location Here"
          className="bg-transparent outline-none focus:outline-none focus:ring-0 border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <Button className="w-full bg-white text-black hover:bg-gray-200 font-medium py-5">
        Save Changes
      </Button>
    </div>
  );
};

// Change Password Tab Component
const ChangePasswordTab = () => {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <Label
          htmlFor="currentPassword"
          className="text-sm font-medium text-gray-300"
        >
          Current Password
        </Label>
        <Input
          id="currentPassword"
          type="password"
          placeholder="Enter current password"
          className="bg-transparent outline-none focus:outline-none focus:ring-0 border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="newPassword"
          className="text-sm font-medium text-gray-300"
        >
          New Password
        </Label>
        <Input
          id="newPassword"
          type="password"
          placeholder="Enter new password"
          className="bg-transparent outline-none focus:outline-none focus:ring-0 border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-gray-300"
        >
          Confirm New Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          className="bg-transparent outline-none focus:outline-none focus:ring-0 border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <Button className="w-full bg-white text-black hover:bg-gray-200 font-medium py-3">
        Update Password
      </Button>
    </div>
  );
};

// Leaderboard Tab Component
// const LeaderboardTab = () => {
// const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="space-y-4">
//       <LeaderboardModal isOpen={isOpen} setIsOpen={setIsOpen}/>
//     </div>
//   );
// };


const TreeLogo = ({ className = "w-16 h-16", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 85V70M50 70C45 65 35 60 30 50C25 40 30 30 40 25C45 22 50 25 50 30C50 25 55 22 60 25C70 30 75 40 70 50C65 60 55 65 50 70Z"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M45 85H55M42 88H58"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// My Membership Tab Component
const MyMembershipTab = () => {
  return (
    <div className="lg:space-y-8 space-y-2 max-w-4xl mx-auto">
      {/* Header with Logo */}
      <div className="text-center">
        <MainLogo className="w-12 h-12 lg:w-16 lg:h-16 mx-auto lg:mb-6 mb-2" color="#ffffff" />
        <h3 className="lg:text-3xl text-xl font-bold text-white mb-2">My Membership</h3>
      </div>

      {/* Membership Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Advanced Membership Card */}
        <Card className="bg-transparent border-2 border-cyan-400 rounded-2xl overflow-hidden">
          <CardContent className="lg:p-8 p-4 text-center">
            <h4 className="lg:text-2xl text-xl font-bold text-cyan-400 lg:mb-4 mb-2">Advanced Membership</h4>

            <MainLogo className="w-12 h-12 lg:w-20 lg:h-20 mx-auto lg:mb-6 mb-2" color="#22d3ee" />

            <p className="text-gray-300 lg:mb-8 mb-4 text-sm leading-relaxed">
              Upgrade to 'Advanced Membership' - The First Level!
            </p>

            <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-4 rounded-xl text-lg transition-all duration-200">
              AED 300
            </Button>
          </CardContent>
        </Card>

        {/* Premium Membership Card */}
        <Card className="bg-transparent border-2 border-yellow-400 rounded-2xl overflow-hidden">
          <CardContent className="p-8 text-center">
            <div className="mb-4">
              <h4 className="text-2xl font-bold text-yellow-400">Premium Membership</h4>
              <p className="text-yellow-300 text-sm font-medium">(Fast-Track)</p>
            </div>

            <MainLogo className="w-16 h-16 mx-auto mb-6" color="#facc15" />

            <p className="text-gray-300 mb-8 text-sm leading-relaxed">
              Skip the 'Advanced Membership' and Upgrade Directly to the 'Premium Membership' for a Discounted Price
            </p>

            <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-xl text-lg transition-all duration-200">
              AED 900
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main Profile Page Component
export default function ProfileDashboardComponents({
  isProfileModalOpen = true,
  setIsProfileModalOpen = () => { },
  setIsProfileOpen = () => { },
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Lock/unlock body scroll when modal opens/closes
  useEffect(() => {
    if (isProfileModalOpen) {
      setShouldRender(true);
      // Small delay to trigger animation after render
      setTimeout(() => setIsAnimating(true), 10);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before hiding
      setTimeout(() => setShouldRender(false), 300);
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isProfileModalOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsProfileModalOpen(false);
    }, 300);
  };

  return (
    <div className="mt-16 z-[9999]">
      {/* Modal Overlay and Content */}
      {shouldRender && (
        <div
          className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-100' : 'opacity-0'
            }`}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div
            className={`relative backdrop-blur-lg border bg-gray/10 text-white rounded-xl p-8 max-w-6xl w-full max-h-[90vh] transition-all duration-300 ease-in-out transform ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
            style={{
              overflow: 'hidden',
            }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 cursor-pointer text-white text-xl font-bold hover:text-gray-300 transition-colors z-10"
            >
              ✕
            </button>

            {/* Modal Content with Hidden Scrollbar */}
            <div
              className="max-w-full h-full"
              style={{
                overflow: 'auto',
                scrollbarWidth: '2px', /* Firefox */
                msOverflowStyle: '2px', /* IE and Edge */
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: block; /* Chrome, Safari, Opera */
                }
              `}</style>

              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="flex  backdrop-blur-lg bg-gray/0 w-full">
                  <TabsTrigger
                    value="profile"
                    className="data-[state=active]:text-white data-[state=active]:text-xl cursor-pointer"
                  >
                    Edit Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="password"
                    className="data-[state=active]:text-white data-[state=active]:text-xl cursor-pointer"
                  >
                    Change Password
                  </TabsTrigger>
                  {/* <TabsTrigger
                    value="leaderboard"
                    className="data-[state=active]:text-white data-[state=active]:text-xl cursor-pointer"
                  >
                    Leaderboard
                  </TabsTrigger> */}
                  <TabsTrigger
                    value="membership"
                    className="data-[state=active]:text-white data-[state=active]:text-xl cursor-pointer"
                  >
                    My Membership
                  </TabsTrigger>
                </TabsList>

                <Card className="mt-6 backdrop-blur-lg bg-gray/0">
                  <CardContent className="lg:p-8">
                    <TabsContent value="profile" className="mt-0">
                      <ProfileTab />
                    </TabsContent>

                    <TabsContent value="password" className="mt-0">
                      <ChangePasswordTab />
                    </TabsContent>

                    {/* <TabsContent value="leaderboard" className="mt-0">
                      <LeaderboardTab />
                    </TabsContent> */}

                    <TabsContent value="membership" className="mt-0">
                      <MyMembershipTab />
                    </TabsContent>
                  </CardContent>
                </Card>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}