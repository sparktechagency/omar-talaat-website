"use client";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        {/* Footer Content */}
        <div className="mb-4">
          <p>&copy; {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
        </div>

        {/* Footer Links */}
        <div className="space-x-6">
          <a href="/about" className="hover:underline">
            About Us
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>

        {/* Social Icons */}
        <div className="mt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl mx-2 hover:text-blue-500"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl mx-2 hover:text-blue-400"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl mx-2 hover:text-pink-500"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
