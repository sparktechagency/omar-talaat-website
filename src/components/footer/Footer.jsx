import Image from "next/image";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className=" text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Categories Section */}
          <div>
            <Image
              src="/assests/qiloco-logo.png"
              alt="logo"
              height={60}
              width={60}
              className="object-cover mb-6 "
            />
            <p>
              Premium wholesale supplier of THCA hemp flower. Trusted quality,
              competitive pricing tailored for businesses.
            </p>

            {/* social icon  */}

            <div className="flex gap-x-5 mt-6">
              <FaFacebook />
              <FaXTwitter />
              <FaInstagram />
              <FaLinkedin />
            </div>
          </div>
          {/* Categories Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  THCA Flower Wholesale
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  THCA Flower Ounces
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  White Label THCA
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Stay Updated Section */}
          <div
            className="bg-cover bg-center p-8 h-64"
            style={{ backgroundImage: "url(/assests/footerPic.png)" }}
          >
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="mb-4">Get real-time updates from us.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-l-lg text-white border-2"
              />
              <button
                type="submit"
                className="bg-button p-2 rounded-r-lg hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
