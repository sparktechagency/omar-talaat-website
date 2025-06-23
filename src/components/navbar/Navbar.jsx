"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineChartBar } from "react-icons/hi";
import {
  CalenderLogo,
  CoinsLogo,
  Logo,
  MainLogo,
  MyBug,
  MyProfile,
  Ranking,
} from "../share/svg/Logo";
import Image from "next/image";
import LeaderboardModal from "./LeaderBoard";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  

  // Initialize search query from URL params
  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchQuery(query);
  }, [searchParams]);

  // Debounced search function for real-time URL update
  const debounceTimer = useRef(null);

  const updateSearchUrl = useCallback(
    (query) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams);
        if (query.trim()) {
          params.set("search", query.trim());
        } else {
          params.delete("search");
        }
        const queryString = params.toString();
        router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, {
          scroll: false,
        });
      }, 300); // 300ms delay
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-menu")) {
        setIsProfileOpen(false);
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Form submit is now handled by real-time search
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    updateSearchUrl(value); // Real-time URL update
  };

  const handleKeyPress = (e) => {
    // Remove enter key requirement - search is now real-time
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-50  backdrop-blur-md   shadow-lg">
      <div className="container mx-auto flex justify-between items-center h-24 px-4 lg:px-6">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-lg font-bold text-white drop-shadow-lg"
        >
          <MainLogo color={`#fff`} width={65} height={70} />
        </Link>

        {/* Middle: Navigation Links & Search (Desktop) */}
        <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
          {/* Navigation Links */}
          <ul className="flex space-x-6">
            {[
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
              { name: "Auctions", path: "/auctions" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`relative pb-1 transition-all duration-300 ease-in-out text-white drop-shadow-md ${
                    pathname === item.path
                      ? "border-b-2 border-white/80"
                      : "hover:border-b-2 hover:border-white/60"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search Bar */}
          <div className="relative ml-8">
            <form onSubmit={handleSearch} className="relative">
              <div
                className={`flex items-center backdrop-blur-sm bg-white/20 border border-white/30 rounded-full px-4 py-2 transition-all duration-300 ${
                  isSearchFocused ? "ring-2 ring-white/50 bg-white/30" : ""
                }`}
              >
                <FaSearch className="text-white/70 mr-3" />
                <input
                  type="text"
                  placeholder="Search Corals"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="bg-transparent text-white placeholder-white/60 outline-none w-64"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Mobile Search Bar - Show only on mobile between left and right */}
        <div className="lg:hidden flex-1 mx-4">
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center backdrop-blur-sm bg-white/20 border border-white/30 rounded-full px-3 py-2">
              <FaSearch className="text-white/70 mr-2 text-sm" />
              <input
                type="text"
                placeholder="Search Corals"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                className="bg-transparent text-white placeholder-white/60 outline-none flex-1 text-sm"
              />
            </div>
          </form>
        </div>

        {/* Right: Stats & Profile Icons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Stats Icons (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-4 text-sm">
            {/* Calendar Icon with number */}
            <div className="flex items-center space-x-1">
              <CalenderLogo />
              <span className="text-white text-4xl font-brush drop-shadow-lg">
                7
              </span>
            </div>

            {/* Coral Icon with number */}
            <div className="flex items-center space-x-1">
              <Logo />
              <span className="text-white font-brush text-4xl drop-shadow-lg">
                512
              </span>
            </div>

            {/* Coin Icon with number - Show directly on large devices */}
            <div className="flex items-center space-x-1">
              <CoinsLogo />
              <span className="text-white font-brush text-4xl drop-shadow-lg">
                235
              </span>
            </div>
          </div>

          {/* Coin Icon with tooltip - Show only on mobile */}
          <div className="relative group md:hidden">
            <button className="flex items-center space-x-1">
              <CoinsLogo />
            </button>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 backdrop-blur-sm bg-black/60 border border-white/20 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              235 Coins
            </div>
          </div>
          <div className="relative group ">
            <button
              className="flex items-center space-x-1  "
              onClick={() => setIsOpen(true)}
            >
              <Ranking />
            </button>
          </div>

          {/* Cart Icon - Hidden on mobile */}
          <Link
            href="/cart"
            className="hidden lg:block text-xl text-white hover:text-white/80 transition-colors duration-300"
          >
            <Image
              loading="lazy"
              src="/assets/image 10.png"
              height={55}
              width={55}
              className="drop-shadow-lg"
            />
            {/* <MyBug /> */}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative profile-menu">
            <button
              className="text-xl flex items-center justify-center w-8 h-8 text-white hover:text-white/80 transition-colors duration-300"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <MyProfile />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-60 backdrop-blur-md bg-black/40 border border-white/20 text-white shadow-xl rounded-lg overflow-hidden">
                <ul className="py-2">
                  <li>
                    <Link
                      href="/profile-dashboard"
                      className="block px-4 py-2 hover:bg-white/10 transition-colors duration-200"
                    >
                      Profile Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-feed"
                      className="block px-4 py-2 hover:bg-white/10 transition-colors duration-200"
                    >
                      My Feed
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-post"
                      className="block px-4 py-2 hover:bg-white/10 transition-colors duration-200"
                    >
                      My Post
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-download"
                      className="block px-4 py-2 hover:bg-white/10 transition-colors duration-200"
                    >
                      Download Video
                    </Link>
                  </li>
                  {/* Cart option for mobile in profile menu */}
                  <li className="lg:hidden">
                    <Link
                      href="/cart"
                      className="block px-4 py-2 hover:bg-white/10 transition-colors duration-200"
                    >
                      My Cart
                    </Link>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-white/10 transition-colors duration-200"
                      onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    >
                      <div className="flex justify-between items-center">
                        Settings
                        <MdKeyboardArrowDown
                          className={`transform transition-transform ${
                            isSettingsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>
                    {isSettingsOpen && (
                      <ul className="pl-4 bg-white/5 border-t border-white/10">
                        <li>
                          <Link
                            href="/contact"
                            className="block px-4 py-2 hover:bg-white/10 transition-colors duration-200"
                          >
                            Contact us
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/terms"
                            className="block px-4 py-2 hover:bg-white/10 transition-colors duration-200"
                          >
                            Terms & Conditions
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/change-password"
                            className="block px-4 py-2 hover:bg-white/10 transition-colors duration-200"
                          >
                            Change Password
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/policy"
                            className="block px-4 py-2 hover:bg-white/10 transition-colors duration-200"
                          >
                            Privacy Policy
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <Link
                      href="/login"
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          localStorage.removeItem("user");
                          localStorage.removeItem("token");
                        }
                      }}
                      className="block px-4 py-2 mt-2 border-t border-white/20 hover:bg-white/10 text-red-400 transition-colors duration-200"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-xl flex items-center justify-center w-8 h-8 ml-2 text-white hover:text-white/80 transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <AiOutlineClose className="text-white drop-shadow-lg" />
            ) : (
              <FiMenu className="text-white drop-shadow-lg" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden backdrop-blur-md bg-black/40 border-t border-white/20 text-white">
          {/* Mobile Navigation Links */}
          <ul className="p-4 space-y-3">
            {[
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
              { name: "Auctions", path: "/auctions" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`block py-2 px-4 rounded-lg transition-all duration-300 ${
                    pathname === item.path
                      ? "bg-white/20 text-white border border-white/30"
                      : "hover:bg-white/10 hover:border hover:border-white/20"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Stats */}
          <div className="p-4 border-t border-white/20">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <CalenderLogo />
                <span className="text-white font-brush text-2xl drop-shadow-lg">
                  7
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Logo />
                <span className="text-white font-brush text-2xl drop-shadow-lg">
                  512
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Ranking />
              </div>
            </div>
          </div>
        </div>
      )}

      <LeaderboardModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
}
