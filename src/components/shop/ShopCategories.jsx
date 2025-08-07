// "use client";

// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
// import { CalenderLogo, CoinsLogo, Logo, MainLogo } from "../share/svg/Logo";
// import { useGetCategoriesQuery } from "@/redux/featured/category/categoryApi";
// // import { useGetCategoriesQuery } from "@/redux/featured/category/categoryApi";

// const AllCategories = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlay, setIsAutoPlay] = useState(true);
//   const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
//   const [showVaultModal, setShowVaultModal] = useState(false);
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordError, setPasswordError] = useState("");
//  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
   
//    // Get category data from API
//    const categoryData = useMemo(() => categories?.data || [], [categories]);

//   // Available images to cycle through
//   const availableImages = [
//     "/assets/category1.png",
//     "/assets/category11.png",
//     "/assets/category12.png",
//     "/assets/category4.png",
//   ];

//   // Mineral data with images
//   const minerals = [
//     {
//       id: 1,
//       name: "All Coral",
//       image: availableImages[0],
//       description: "Browse all available coral types",
//     },
//     {
//       id: 2,
//       name: "Zoanthids",
//       image: availableImages[1],
//       description: "Colorful colonial marine organisms",
//     },
//     {
//       id: 3,
//       name: "SPS",
//       image: availableImages[1],
//       description: "Small Polyp Stony corals with intricate structures",
//     },
//     {
//       id: 4,
//       name: "LPS",
//       image: availableImages[2],
//       description: "Large Polyp Stony corals with flowing tentacles",
//     },
//     {
//       id: 5,
//       name: "Acropora",
//       image: availableImages[0],
//       description: "Fast-growing branching SPS corals",
//     },
//     {
//       id: 6,
//       name: "Montipora",
//       image: availableImages[1],
//       description: "Plating and encrusting SPS corals",
//     },
//     {
//       id: 7,
//       name: "Soft Corals",
//       image: availableImages[2],
//       description: "Flexible corals that sway with the current",
//     },
//     {
//       id: 8,
//       name: "Anemones",
//       image: availableImages[3],
//       description: "Sea anemones and related species",
//     },
//     {
//       id: 9,
//       name: "WYSIWYG",
//       image: availableImages[0],
//       description: "What You See Is What You Get specimens",
//     },
//     {
//       id: 10,
//       name: "Zoanth",
//       image: availableImages[1],
//       description: "Premium zoanthid collections",
//     },
//     {
//       id: 11,
//       name: "The Vault",
//       image: availableImages[2],
//       description: "Rare and exclusive coral specimens",
//       isLocked: true,
//     },
//   ];

//   const visibleCount = 4;
//   const maxIndex = Math.floor(minerals.length / visibleCount + 2);

//   // Auto-play functionality
//   useEffect(() => {
//     if (!isAutoPlay) return;

//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [isAutoPlay, maxIndex]);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
//   };

//   const goToSlide = (index) => {
//     setCurrentIndex(Math.min(index, maxIndex));
//   };

//   const handleCategoryClick = (mineral) => {
//     if (mineral.isLocked && !isVaultUnlocked) {
//       setShowVaultModal(true);
//       // Reset password state when opening modal
//       setPassword("");
//       setPasswordError("");
//       return;
//     }
    
//     // Normal category navigation
//     // router.push(`/category/${mineral.id}`);
//     console.log(`Navigating to category: ${mineral.name}`);
//   };




//   const VaultModal = () => (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//       <div className="bg-black border border-white/20 rounded-2xl p-8 max-w-md w-full relative">
//         {/* Close button */}
//         <button
//           className="absolute top-4 left-4 text-white/70 hover:text-white transition-colors"
//         >
//           <ArrowLeft className="w-6 h-6" />
//         </button>

//         {/* Modal content */}
//         <div className="text-center">
//           <div className="mb-6">
//             <div className="w-20 h-20 mx-auto mb-4  rounded-full flex items-center justify-center">
//               <Lock className="w-10 h-10 text-white" />
//             </div>
//             <h2 className="text-3xl font-bold text-white mb-2">The Vault</h2>
//           </div>

//           <div className="mb-6">
//             <p className="text-white/80 mb-4">Minimum Requirements To Ask For Permission:</p>
//             <div className="flex items-center justify-center gap-4 mb-6">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 rounded-full flex items-center justify-center">
//                 <MainLogo className="bg-premium  " color="#DB9D17" />
               
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8   flex items-center justify-center">
//                 <CalenderLogo />
//                 </div>
//                 <span className="text-[40px] font-bold font-brush">5</span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 rounded-full flex items-center justify-center">
//                 <Logo />
               
//                 </div>
//                 <span className="text-[40px] font-bold font-brush">1000</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8  flex items-center justify-center">
//                 <CoinsLogo />
//                 </div>
//                 <span className="text-yellow-500 text-[40px] font-brush font-bold">1000</span>
//               </div>
//             </div>
//           </div>

//           <div className="mb-6">
//             <label className="block text-white/70 text-start text-sm mb-2">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                   setPasswordError(""); // Clear error when typing
//                 }}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 pr-12"
//                 placeholder="Enter password"
//                 autoComplete="off"
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     handlePasswordSubmit();
//                   }
//                 }}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform  -translate-y-1/2 text-white/50 hover:text-white/70"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//             {passwordError && (
//               <p className="text-red-400 text-sm mt-2">{passwordError}</p>
//             )}
//           </div>

//           <button
//             onClick={handlePasswordSubmit}
//             className="w-full border border-white/40  p-2 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
//           >
//             Unlock The Vault
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="container w-full mx-auto bg-black lg:my-20 my-10 flex flex-col justify-center">
//       {/* Header */}
//       <div className="text-center lg:mb-12 mb-5">
//         <h1 className="text-4xl font-bold bg-clip-text text-white">Shop Categories</h1>
//       </div>

//       {/* Slider for Small/Medium Devices */}
//       <div className="lg:hidden">
//         <div className="relative">
//           <button
//             onClick={prevSlide}
//             className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/20"
//           >
//             <ChevronLeft className="w-6 h-6 text-white" />
//           </button>

//           <button
//             onClick={nextSlide}
//             className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/20"
//           >
//             <ChevronRight className="w-6 h-6 text-white" />
//           </button>

//           <div className="overflow-hidden rounded-2xl">
//             <div
//               className="flex transition-transform duration-500 ease-out gap-6 px-16 lg:py-10 py-6"
//               style={{
//                 transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
//                 width: `${(minerals.length / visibleCount) * 100}%`,
//               }}
//             >
//               {minerals.map((mineral, index) => (
//                 <div
//                   key={mineral.id}
//                   className="flex-shrink-0 relative group cursor-pointer"
//                   style={{ width: `${100 / minerals.length}%` }}
//                   onClick={() => handleCategoryClick(mineral)}
//                 >
//                   <div className="w-[130px] h-[130px] aspect-square rounded-xl overflow-hidden relative transform transition-all duration-300 group-hover:border-white/30 shadow-2xl">
//                     <img
//                       src={mineral.image}
//                       alt={mineral.name}
//                       className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-125"
//                     />
//                     {mineral.isLocked && !isVaultUnlocked && (
//                       <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
//                         <Lock className="w-8 h-8 text-yellow-400" />
//                       </div>
//                     )}
//                   </div>
//                   <h3 className="text-white font-semibold text-xs truncate mt-2 text-center">
//                     {mineral.name}
//                   </h3>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center justify-center lg:mt-8 mt-0 gap-6">
//           <div className="flex gap-2">
//             {[...Array(maxIndex + 1)].map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   currentIndex === index
//                     ? "bg-cyan-400 shadow-lg shadow-cyan-400/50"
//                     : "bg-white/30 hover:bg-white/50"
//                 }`}
//               />
//             ))}
//           </div>

//           <button
//             onClick={() => setIsAutoPlay(!isAutoPlay)}
//             className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-all duration-300 backdrop-blur-sm border border-white/20"
//           >
//             {isAutoPlay ? "Pause" : "Play"}
//           </button>
//         </div>
//       </div>

//       {/* Grid Layout for Large Devices */}
//       <div className="hidden lg:grid lg:grid-cols-11 gap-6 px-4">
//         {minerals.map((mineral) => (
//           <div
//             key={mineral.id}
//             className="flex flex-col items-center cursor-pointer group"
//             onClick={() => handleCategoryClick(mineral)}
//           >
//             <div className="w-[130px] h-[130px] aspect-square rounded-xl overflow-hidden relative transform transition-all duration-300 group-hover:border-white/30 shadow-2xl">
//               <img
//                 src={mineral.image}
//                 alt={mineral.name}
//                 className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-125"
//               />
//               {mineral.isLocked && !isVaultUnlocked && (
//                 <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
//                   <Lock className="w-8 h-8 text-yellow-400" />
//                 </div>
//               )}
//             </div>
//             <h3 className="text-white font-semibold text-sm truncate mt-2 text-center">
//               {mineral.name}
//             </h3>
//           </div>
//         ))}
//       </div>

//       {/* Vault Modal */}
//       {showVaultModal && <VaultModal />}
//     </div>
//   );
// };

// export default AllCategories;






"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { CalenderLogo, CoinsLogo, Logo, MainLogo } from "../share/svg/Logo";
import { useGetCategoriesQuery } from "@/redux/featured/category/categoryApi";
import { getImageUrl } from "../share/imageUrl";
import Spinner from "@/app/(commonLayout)/Spinner";

// VaultModal Component - Separated for modularity
const VaultModal = ({ 
  showVaultModal, 
  setShowVaultModal, 
  password, 
  setPassword, 
  showPassword, 
  setShowPassword, 
  passwordError, 
  handlePasswordSubmit 
}) => {
  if (!showVaultModal) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-white/20 rounded-2xl p-8 max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={() => setShowVaultModal(false)}
          className="absolute top-4 left-4 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Modal content */}
        <div className="text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">The Vault</h2>
          </div>

          <div className="mb-6">
            <p className="text-white/80 mb-4">Minimum Requirements To Ask For Permission:</p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <MainLogo className="bg-premium" color="#DB9D17" />
              </div>
              
              <div className="flex items-center gap-2">
                <CalenderLogo />
                <span className="text-[40px] font-bold font-brush">5</span>
              </div>

              <div className="flex items-center gap-2">
                <Logo />
                <span className="text-[40px] font-bold font-brush">1000</span>
              </div>

              <div className="flex items-center gap-2">
                <CoinsLogo />
                <span className="text-yellow-500 text-[40px] font-brush font-bold">1000</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-white/70 text-start text-sm mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 pr-12"
                placeholder="Enter password"
                autoComplete="off"
                onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-400 text-sm mt-2">{passwordError}</p>
            )}
          </div>

          <button
            onClick={handlePasswordSubmit}
            className="w-full border border-white/40 p-2 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Unlock The Vault
          </button>
        </div>
      </div>
    </div>
  );
};

// CategoryCard Component - Separated for modularity
const CategoryCard = ({ category, onClick, isVaultUnlocked }) => {
  const isVault = category.name === "The Vault";
  const isLocked = isVault && !isVaultUnlocked;

  return (
    <div
      className="flex flex-col items-center cursor-pointer group"
      onClick={() => onClick(category)}
    >
      <div className="w-[130px] h-[130px] aspect-square rounded-xl overflow-hidden relative transform transition-all duration-300 group-hover:border-white/30 shadow-2xl">
        <img
          src={getImageUrl(category.image)}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-125"
        />
        {isLocked && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
            <Lock className="w-8 h-8 text-yellow-400" />
          </div>
        )}
      </div>
      <h3 className="text-white font-semibold text-sm truncate mt-2 text-center">
        {category.name}
      </h3>
    </div>
  );
};

// Main Component
const AllCategories = () => {
  // States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [showVaultModal, setShowVaultModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // API Query
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  
  // Memoized category data
  const categoryData = useMemo(() => categories?.data || [], [categories]);
  
  // Slider configuration
  const visibleCount = 4;
  const maxIndex = useMemo(() => 
    categoryData.length > 0 ? Math.floor(categoryData.length / visibleCount + 2) : 0, 
    [categoryData.length]
  );

  // Slider functions
  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  }, [maxIndex]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  }, [maxIndex]);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlay || categoryData.length === 0) return;

    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlay, nextSlide, categoryData.length]);

  // Handle category click
  const handleCategoryClick = useCallback((category) => {
    const isVault = category.name === "The Vault";
    
    if (isVault && !isVaultUnlocked) {
      setShowVaultModal(true);
      setPassword("");
      setPasswordError("");
      return;
    }
    
    console.log(`Navigating to category: ${category.name}`);
    // Add your navigation logic here
  }, [isVaultUnlocked]);

  // Handle password submission
  const handlePasswordSubmit = useCallback(() => {
    if (password === "your-vault-password") { // Replace with your actual password logic
      setIsVaultUnlocked(true);
      setShowVaultModal(false);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password");
    }
  }, [password]);

if (isLoading) return <Spinner />;

  // Error state
  if (isError || categoryData.length === 0) {
    return (
      <div className="container w-full mx-auto bg-black lg:my-20 my-10 flex flex-col justify-center items-center py-20">
        <h1 className="text-4xl font-bold text-white mb-8">Shop Categories</h1>
        <div className="text-white text-lg">No categories available</div>
      </div>
    );
  }

  return (
    <div className="container w-full mx-auto bg-black lg:my-20 my-10 flex flex-col justify-center">
      {/* Header */}
      <div className="text-center lg:mb-12 mb-5">
        <h1 className="text-4xl font-bold text-white">Shop Categories</h1>
      </div>

      {/* Mobile Slider */}
      <div className="lg:hidden">
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Slider Track */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out gap-6 px-16 py-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                width: `${(categoryData.length / visibleCount) * 100}%`,
              }}
            >
              {categoryData.map((category) => (
                <div
                  key={category._id}
                  className="flex-shrink-0 relative group cursor-pointer"
                  style={{ width: `${100 / categoryData.length}%` }}
                  onClick={() => handleCategoryClick(category)}
                >
                  <CategoryCard 
                    category={category} 
                    onClick={handleCategoryClick}
                    isVaultUnlocked={isVaultUnlocked}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center mt-6 gap-6">
          {/* Dots */}
          <div className="flex gap-2">
            {[...Array(maxIndex + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-cyan-400 shadow-lg shadow-cyan-400/50"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            {isAutoPlay ? "Pause" : "Play"}
          </button>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid lg:grid-cols-11 gap-6 px-4">
        {categoryData.map((category) => (
          <CategoryCard 
            key={category._id}
            category={category} 
            onClick={handleCategoryClick}
            isVaultUnlocked={isVaultUnlocked}
          />
        ))}
      </div>

      {/* Vault Modal */}
      <VaultModal
        showVaultModal={showVaultModal}
        setShowVaultModal={setShowVaultModal}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        passwordError={passwordError}
        handlePasswordSubmit={handlePasswordSubmit}
      />
    </div>
  );
};

export default AllCategories;