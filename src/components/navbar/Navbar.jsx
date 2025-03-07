"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  // User authentication state (for demonstration purposes)
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo + Website Name */}
        <Link href="/" className="flex items-center space-x-2 text-lg font-bold">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <span>MyWebsite</span>
        </Link>

        {/* Middle: Navigation Links (Hidden on mobile) */}
        <ul className="hidden md:flex space-x-6">
          {["Home", "About", "Contact"].map((item) => (
            <li key={item}>
              <Link
                href={`/${item.toLowerCase()}`}
                className={`hover:underline ${
                  pathname === `/${item.toLowerCase()}` ? "underline" : ""
                }`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Profile Icon (if logged in) or Login Button */}
        <div className="flex items-center">
          {user ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          ) : (
            <Link
              href="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
            >
              <FaUserCircle className="text-2xl" /> <span>Login / SignUp</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button (Visible only on small screens) */}
        <button
          className="md:hidden ml-4 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <AiOutlineClose /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu (Shown when isOpen is true) */}
      {isOpen && (
        <ul className="md:hidden bg-blue-700 p-4 space-y-3 text-center">
          {["Home", "About", "Contact"].map((item) => (
            <li key={item}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="block hover:underline"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
