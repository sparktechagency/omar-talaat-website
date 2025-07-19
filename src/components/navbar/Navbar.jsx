"use client";
import Image from "next/image";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback, useEffect, useRef, useState, Suspense } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import ProfileDashboardComponents from "../profileIcon/ProfileDashboardComponents";
import {
  CalenderLogo,
  CoinsLogo,
  Logo,
  MainLogo,
  MyProfile,
  Ranking,
} from "../share/svg/Logo";
import CategoryDropdown from "./CategoryDropdown"; // Import the new component
import LeaderboardModal from "./LeaderBoard";

// SearchComponent to wrap with Suspense
function SearchComponent({ onSearchChange }) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Initialize search query from URL params
  useEffect(() => {
    const query = searchParams?.get("search") || "";
    setSearchQuery(query);
  }, [searchParams]);
  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
  };
  
  return (
    <form onSubmit={handleSearch} className="relative">
      <div
        className={`flex items-center backdrop-blur-sm bg-[#181818] border border-white/30 rounded-full px-4 py-2 transition-all duration-300 ${
          isSearchFocused ? "ring-2 ring-white/50 bg-[#181818]" : ""
        }`}
      >
        <FaSearch className="text-white/70 mr-3 lg:mr-2" />
        <input
          type="text"
          placeholder="Search Corals"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className="bg-transparent text-white placeholder-white/60 outline-none w-[300px] xl:w-[500px]"
        />
      </div>
    </form>
  );
}

// Mobile search component
function MobileSearchComponent({ onSearchChange, onClose }) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    const query = searchParams?.get("search") || "";
    setSearchQuery(query);
  }, [searchParams]);
  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
  };
  
  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="flex items-center backdrop-blur-sm bg-white/20 border border-white/30 rounded-full px-3 py-2">
        <FaSearch className="text-white/70 mr-2 text-2xl " />
        <input
          type="text"
          placeholder="Search Corals"
          value={searchQuery}
          onChange={handleSearchChange}
          autoFocus
          className="bg-transparent text-white placeholder-white/60 outline-none flex-1 text-sm"
        />
        <button
          type="button"
          className="text-white/70 px-2"
          onClick={onClose}
        >
          <AiOutlineClose size={16} />
        </button>
      </div>
    </form>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenubarOpen, setMobileMenubarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false); // New state for shop dropdown
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Refs for dropdown
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Debounced search function for real-time URL update
  const debounceTimer = useRef(null);

  const updateSearchUrl = useCallback(
    (query) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
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
    [pathname, router]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle shop dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".shop-link")
      ) {
        setIsShopHovered(false);
      }

      // Handle profile dropdown
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        !event.target.closest(".profile-menu")
      ) {
        setIsProfileOpen(false);
      }

      // Handle mobile search
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !event.target.closest(".search-toggle")
      ) {
        setIsMobileSearchOpen(false);
      }
    };

    if (isShopHovered || isProfileOpen || isMobileSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShopHovered, isProfileOpen, isMobileSearchOpen]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    updateSearchUrl(value); // Real-time URL update
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenubarOpen(false);
    setIsMobileSearchOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="fixed w-full z-50 top-0 left-0 backdrop-blur-[5px] bg-black/30 shadow-2xl">
        <div className="container mx-auto flex gap-12 justify-between items-center h-16 sm:h-20 md:h-24 px-3 sm:px-4 lg:px-0">
          {/* Left: Logo */}
          <div>
            <Link
              href="/"
              className="flex items-center space-x-2 text-lg font-bold text-white drop-shadow-lg"
            >
              <MainLogo
                color={`#fff`}
                width={50}
                height={55}
                className="sm:w-[60px] sm:h-[65px] md:w-[65px] md:h-[70px]"
              />
            </Link>
          </div>

          {/* Middle: Navigation Links & Search (Desktop) */}
          <div className="hidden lg:flex items-center space-x-5  justify-center">
            <div>
              {/* Navigation Links */}
              <ul className="flex space-x-5">
                <li>
                  <Link
                    href="/"
                    className={`relative pb-1 transition-all duration-300 ease-in-out text-white drop-shadow-md ${
                      pathname === "/"
                        ? "border-b-2 border-white/80"
                        : "hover:border-b-2 hover:border-white/60"
                    }`}
                  >
                    Home
                  </Link>
                </li>

                {/* Shop with Dropdown */}
                <li
                  className="relative shop-link"
                  onMouseEnter={() => setIsShopHovered(true)}
                >
                  <Link
                    href="/shop"
                    className={`relative pb-1 transition-all duration-300 ease-in-out text-white drop-shadow-md flex items-center ${
                      pathname === "/shop"
                        ? "border-b-2 border-white/80"
                        : "hover:border-b-2 hover:border-white/60"
                    }`}
                  >
                    Shop
                    <MdKeyboardArrowDown
                      className={`ml-1 transition-transform duration-200 ${
                        isShopHovered ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                </li>

                <li>
                  <Link
                    href="/auctions"
                    className={`relative pb-1 transition-all duration-300 ease-in-out text-white drop-shadow-md ${
                      pathname === "/auctions"
                        ? "border-b-2 border-white/80"
                        : "hover:border-b-2 hover:border-white/60"
                    }`}
                  >
                    Auctions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Search Bar */}
            <div className="relative ml-8">
              <Suspense fallback={<div className="w-[300px] xl:w-[500px] h-10 bg-[#181818]/50 rounded-full animate-pulse"></div>}>
                <SearchComponent onSearchChange={handleSearchChange} />
              </Suspense>
            </div>
          </div>

          {/* Right: Stats & Profile Icons */}
          <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-3 md:space-x-12">
            {/* Search Icon for Mobile - Toggle search bar */}
            <button
              className="lg:hidden flex items-center justify-center w-12 h-12 text-white search-toggle"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              <FaSearch className="text-white/90 text-2xl flex items-center justify-center mt-2" />
            </button>

            {/* Stats Icons (Hidden on mobile) */}
            <div className="hidden lg:flex items-center space-x-3 lg:space-x-7 text-sm">
              {/* Calendar Icon with number */}
              <div className="flex items-center space-x-1">
                <div className="hover:scale-125 transition-transform">
                  <CalenderLogo />
                </div>
                <span className="text-white text-3xl md:text-4xl font-brush drop-shadow-lg">
                  7
                </span>
              </div>

              {/* Coral Icon with number */}
              <div className="flex items-center space-x-1">
                <div className="hover:scale-125 transition-transform">
                  <Logo />
                </div>
                <span className="text-white font-brush text-3xl md:text-4xl drop-shadow-lg">
                  512
                </span>
              </div>

              {/* Coin Icon with number - Show directly on large devices */}
              <div className="flex items-center space-x-1">
                <div className="hover:scale-125 transition-transform">
                  <CoinsLogo />
                </div>
                <span className="text-white font-brush text-3xl md:text-4xl drop-shadow-lg">
                  235
                </span>
              </div>
            </div>

            {/* Coin Icon with tooltip - Show only on small mobile */}
            {/* <div className="relative group xs:hidden">
              <button className="flex items-center justify-center w-8 h-8">
                <div className="hover:scale-125 transition-transform">
                  <CoinsLogo width={24} height={24} />
                </div>
              </button>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 backdrop-blur-sm bg-black/60 border border-white/20 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                235 Coins
              </div>
            </div> */}
            <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-3 md:space-x-5">
              {/* Coin Icon with tooltip - Show only on small to medium mobile */}
              <div className="relative group hidden xs:block md:hidden lg:hidden">
                <button className="flex items-center justify-center w-8 h-8">
                  <div className="hover:scale-125 transition-transform">
                    <CoinsLogo />
                  </div>
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 backdrop-blur-sm bg-black/60 border border-white/20 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  235 Coins
                </div>
              </div>

              {/* Ranking button */}
              <div className="relative group ">
                <button
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10"
                  onClick={() => setIsOpen(true)}
                >
                  <div className="hover:scale-125 transition-transform">
                    <Ranking className="lg:w-[48px] lg:h-[48px] w-[32px] h-[32px]" />
                  </div>
                </button>
              </div>

              {/* Cart Icon - Hidden on mobile */}
              <Link
                href="/cart"
                className="hidden lg:block text-xl text-white hover:text-white/80  transition-colors duration-300"
              >
                <Image
                  loading="lazy"
                  src="/assets/image 10.png"
                  height={55}
                  width={55}
                  className="drop-shadow-lg hover:scale-125 transition-transform"
                  alt="Cart Icon"
                />
              </Link>

              {/* Profile Dropdown */}
              <div className="relative profile-menu">
                <button
                  className="text-xl flex items-center cursor-pointer justify-center w-[32px] h-[32px] sm:w-[45px] sm:h-[45px] md:w-[55px] md:h-[55px] text-white hover:scale-110 hover:text-white/80 transition-all duration-300"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <MyProfile className=" md:w-full md:h-full" />
                </button>
                {isProfileOpen && (
                  <div
                    ref={profileDropdownRef}
                    className="absolute right-0 top-full mt-2 sm:mt-3 md:mt-5 w-48 sm:w-56 md:w-60 backdrop-blur-2xl bg-black/70 border border-white/20 text-white shadow-xl rounded-lg overflow-hidden z-[9999]"
                  >
                    <ul className="py-2">
                      <li>
                        <button
                          onClick={() => {
                            setIsProfileModalOpen(true);
                            setIsProfileOpen(false);
                          }}
                          className="block w-full cursor-pointer text-left px-4 py-2 hover:bg-white/10 transition-colors duration-200"
                        >
                          Profile Dashboard
                        </button>
                      </li>

                      {/* Cart option for mobile in profile menu */}
                      <li className="lg:hidden">
                        <Link
                          href="/cart"
                          className="block px-4 py-2 cursor-pointer hover:bg-white/10 transition-colors duration-200"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          My Cart
                        </Link>
                      </li>
                      {/* <li>
                        <button
                          className="block w-full text-left cursor-pointer px-4 py-2 hover:bg-white/10 transition-colors duration-200"
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
                                className="block px-4 py-2 cursor-pointer hover:bg-white/10 transition-colors duration-200"
                                onClick={() => setIsProfileOpen(false)}
                              >
                                Contact us
                              </Link>
                            </li>
                            <li>
                            <Link
                              href="/terms"
                              className="block px-4 py-2 cursor-pointer hover:bg-white/10 transition-colors duration-200"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              Terms & Conditions
                            </Link>
                          </li>
                            <li>
                            <Link
                              href="/change-password"
                              className="block px-4 py-2 hover:bg-white/10 transition-colors duration-200"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              Change Password
                            </Link>
                          </li>
                            <li>
                            <Link
                              href="/policy"
                              className="block px-4 py-2 hover:bg-white/10 transition-colors duration-200"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              Privacy Policy
                            </Link>
                          </li>
                          </ul>
                        )}
                      </li> */}
                      <li>
                        <Link
                          href="/login"
                          onClick={() => {
                            if (typeof window !== "undefined") {
                              localStorage.removeItem("user");
                              localStorage.removeItem("token");
                            }
                            setIsProfileOpen(false);
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
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 ml-1 text-white hover:text-white/80 transition-colors duration-300"
              onClick={() => setMobileMenubarOpen(!mobileMenubarOpen)}
            >
              {mobileMenubarOpen ? (
                <AiOutlineClose className="text-white drop-shadow-lg text-2xl mt-2 sm:text-2xl " />
              ) : (
                <FiMenu className="text-white drop-shadow-lg text-3xl mt-2 sm:text-2xl " />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Expandable */}
        {isMobileSearchOpen && (
          <div
            ref={searchRef}
            className="lg:hidden px-3 py-2 backdrop-blur-md bg-black/50 border-t border-b border-white/10"
          >
            <Suspense fallback={<div className="h-10 bg-white/20 rounded-full animate-pulse"></div>}>
              <MobileSearchComponent 
                onSearchChange={handleSearchChange} 
                onClose={() => setIsMobileSearchOpen(false)} 
              />
            </Suspense>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenubarOpen && (
          <div className="lg:hidden backdrop-blur-[2px] bg-black/30 border-t shadow-2xl text-white">
            {/* Mobile Navigation Links */}
            <ul className="p-3 sm:p-4 space-y-2 sm:space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Shop", path: "/shop" },
                { name: "Auctions", path: "/auctions" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`block py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 ${
                      pathname === item.path
                        ? "bg-white/20 text-white border border-white/30"
                        : "hover:bg-white/10 hover:border hover:border-white/20"
                    }`}
                    onClick={() => setMobileMenubarOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Stats Icons for Mobile - Added at bottom of mobile menu */}
            <div className="flex items-center justify-center space-x-8 sm:space-x-12 py-5 border-y border-white/20 mt-2 bg-black/30">
              {/* Calendar Icon with number */}
              <div className="flex items-center space-x-2">
                <div className="hover:scale-110 transition-transform">
                  <CalenderLogo width={30} height={30} />
                </div>
                <span className="text-white text-3xl font-brush sm:text-3xl font-bold drop-shadow-lg">
                  7
                </span>
              </div>

              {/* Coral Icon with number */}
              <div className="flex items-center space-x-2">
                <div className="hover:scale-110 transition-transform">
                  {/* <Logo width={30} height={30} /> */}
                  <Image
                    src="/assets/vector.png"
                    alt="Coins"
                    width={30}
                    height={30}
                  />
                </div>
                <span className="text-white font-bold font-brush text-3xl sm:text-3xl drop-shadow-lg">
                  512
                </span>
              </div>

              {/* Coin Icon with number */}
              <div className="flex items-center space-x-2">
                <div className="hover:scale-110 transition-transform">
                  {/* <CoinsLogo width={30} height={30} /> */}
                  <Image
                    src="/assets/frame.png"
                    alt="Coins"
                    width={30}
                    height={30}
                  />
                </div>
                <span className="text-white font-bold text-3xl font-brush sm:text-3xl drop-shadow-lg">
                  235
                </span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {isProfileModalOpen && (
        <ProfileDashboardComponents
          isProfileModalOpen={isProfileModalOpen}
          setIsProfileModalOpen={setIsProfileModalOpen}
          setIsProfileOpen={setIsProfileOpen}
        />
      )}

      {/* Category Dropdown - Outside nav to prevent z-index issues */}
      <CategoryDropdown
        isShopHovered={isShopHovered}
        setIsShopHovered={setIsShopHovered}
      />
      <LeaderboardModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
