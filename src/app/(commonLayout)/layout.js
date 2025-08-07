"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = dynamic(() => import("@/components/navbar/Navbar"), { ssr: false });
const Banner = dynamic(() => import("@/components/home/Banner"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/Footer"), { ssr: false });

const CommonLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-[#000] text-white">
      <Navbar />

      {pathname === "/" && (
        <div className="60">
          <Banner />
        </div>
      )}

      <div className="bg-[#000] flex flex-col flex-grow">
        <main className="lg:my-20 my-10 flex-1">
          <div>{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default CommonLayout;
