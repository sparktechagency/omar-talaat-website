"use client";

import Footer from "@/components/footer/Footer";
import Banner from "@/components/home/Banner";
import Navbar from "@/components/navbar/Navbar";
import { usePathname } from "next/navigation";
import React from "react";

const CommonLayout = ({ children }) => {
  const pathname = usePathname();
  return (
    <div className="min-h-screen flex flex-col bg-[#000] text-white">
      {/* Header */}
      <Navbar />
      {pathname === "/" && <Banner />}
      {/* Main content */}
      <div className="bg-[#000] flex flex-col flex-grow">
        <main className="container mx-auto flex-1 mt-[120px] sm:mt-[100px] md:mt-[120px] lg:mt-[130px]">
          <div className="">{children}</div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CommonLayout;
