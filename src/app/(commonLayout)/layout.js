import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

const CommonLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Navbar />
      {/* Main content */}
      <div className="bg-[#18191b] flex flex-col flex-grow">
        <main className="container mx-auto flex-1">
          <div className="">{children}</div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CommonLayout;
