"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import ProfileTab from "./tabs/ProfileTab";
import ChangePasswordTab from "./tabs/ChangePasswordTab";
import MyMembershipTab from "./tabs/MyMembershipTab";

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