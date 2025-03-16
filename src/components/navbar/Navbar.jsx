"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" text-white fixed w-full top-0 left-0 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center h-20 px-4">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-lg font-bold"
        >
          <img
            src="/assests/qiloco-logo.png"
            alt="Logo"
            className="w-10 h-10"
          />
          {/* <span>MyWebsite</span> */}
        </Link>

        {/* Middle: Navigation Links (Hidden on mobile) */}
        <ul className="hidden md:flex space-x-6">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Shop", path: "/shop" },
            { name: "Contact Us", path: "/contact" },
            { name: "Wholesale", path: "/wholesale" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`relative pb-1 transition-all duration-300 ease-in-out ${
                  pathname === item.path
                    ? "border-b-2 border-red-500"
                    : "hover:border-b-2 hover:border-red-500"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Cart Icon & Profile Icon */}
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="text-2xl">
            <FaShoppingCart />
          </Link>
          <Link href="/login" className="text-2xl">
            <FaUserCircle />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <AiOutlineClose /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-gray-800 p-4 text-center space-y-3">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Shop", path: "/shop" },
            { name: "Contact Us", path: "/contact" },
            { name: "Wholesale", path: "/wholesale" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className="block hover:underline"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
