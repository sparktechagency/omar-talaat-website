"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Container from "../share/Container";
import FilterSection from "./FilteringSection";
import ProductCard from "./ProductCard";
import ProductControls from "./ProductControls";
import { addToCart } from "@/redux/featured/cart/cartSlice";
import { useGetProductsQuery } from "@/redux/featured/shop/shopApi";
import { useGetMyProfileQuery } from "@/redux/featured/auth/authApi";
import { saveProductToCart } from "../share/utils/cart";
import { saveToRecentViews } from "../share/utils/recentView";

const CoralShopGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);;
  
  // Get user profile for cart identification
  const { data: user } = useGetMyProfileQuery();
  const currentUser = user?.data;
  const userEmail = user?.data?.email;

  
  // Improved data fetching with proper loading states and error handling
  const { 
    data: allProduct, 
    isLoading, 
    error, 
    refetch,
    isFetching 
  } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: true,
  });
  
  const productData = allProduct?.data?.result || [];
  
  console.log("Product Data:", productData);
  console.log("All Product:", allProduct);
  console.log("Is Loading:", isLoading);
  console.log("Is Fetching:", isFetching);
  console.log("Error:", error);
  console.log("Current User:", currentUser);
  
  const router = useRouter();
  const dispatch = useDispatch();

  // Grid container reference for animation
  const gridRef = useRef(null);
  const filterRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });
  const filterAnimation = useAnimation();

  // Simple filters
  const [priceRange, setPriceRange] = useState([0, 400]);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const sortOptions = [
    "Featured",
    "Price: Low to High",
    "Price: High to Low",
    "Name A-Z",
    "Name Z-A",
  ];

  // Force refetch on component mount
  useEffect(() => {
    if (!isLoading && !productData.length && !error) {
      console.log("Forcing refetch due to empty data...");
      refetch();
    }
  }, [isLoading, productData.length, error, refetch]);

  // Close mobile filter drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileFilterOpen &&
        !event.target.closest(".mobile-filter-drawer") &&
        !event.target.closest(".filter-toggle-btn")
      ) {
        setIsMobileFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileFilterOpen]);

  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileFilterOpen]);

  // Toggle filter visibility with animation
  const toggleFilterVisibility = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAnimating) return;

    setIsAnimating(true);

    if (isFilterVisible) {
      filterAnimation
        .start({
          width: 0,
          opacity: 0,
          marginRight: 0,
          scale: 0.9,
          transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
        })
        .then(() => {
          setIsFilterVisible(false);
          setTimeout(() => {
            setIsAnimating(false);
          }, 100);
        });
    } else {
      setIsFilterVisible(true);

      setTimeout(() => {
        filterAnimation
          .start({
            width: "16.666667%",
            opacity: 1,
            scale: 1,
            marginRight: "1rem",
            transition: {
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
              opacity: { duration: 0.9 },
              scale: { duration: 0.7, delay: 0.1 },
            },
          })
          .then(() => {
            setTimeout(() => {
              setIsAnimating(false);
            }, 100);
          });
      }, 10);
    }
  };

  // Initialize filter animation on mount
  useEffect(() => {
    if (isFilterVisible) {
      filterAnimation.start({
        width: "16.666667%",
        opacity: 1,
        scale: 1,
        marginRight: "1rem",
      });
    } else {
      filterAnimation.start({
        width: 0,
        opacity: 0,
        scale: 0.9,
        marginRight: 0,
      });
    }
  }, []);

  // Helper function to get user-specific cart key
  const getUserCartKey = () => {
    if (currentUser?.email) {
      return `coral_cart_${currentUser.email}`;
    } else if (currentUser?._id) {
      return `coral_cart_${currentUser._id}`;
    }
    // Fallback to generic cart if no user
    return 'coral_cart_guest';
  };

  // Map API data to the required format for the UI
  const products = React.useMemo(() => {
    if (!productData || !Array.isArray(productData)) return [];
    
    return productData.map((item) => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      images: item.images ,
      // && item.images.length > 0 ? item.images[0] : ''
      status: item.status === 'active' ? (item.isStock ? 'In Stock' : 'Out of Stock') : item.status,
      available: item.creditNeeds === 0 && !item.premiumMembership && !item.advanceMembership,
      creditNeeds: item.creditNeeds,
      membership: item.premiumMembership
        ? 'premium'
        : item.advanceMembership
        ? 'advanced'
        : 'normal',
      description: item.description,
      stock: item.stock,
    }));
  }, [productData]);

  const handleProductClick = (product) => {
     if (userEmail && product) {
          saveToRecentViews(product, userEmail);
        }
    if (product.available) {
      router.push(`/shop/${product._id}`);
    }
  };

  // Enhanced add to cart function with user-specific storage
   const handleAddToCart = (e, product) => {
      e.stopPropagation();
      saveProductToCart(product, userEmail);
   
  };

  // Enhanced loading state with retry option
  if (isLoading || isFetching) {
    return (
      <Container className="min-h-screen text-white">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-400">
              {isLoading ? "Loading products..." : "Refreshing data..."}
            </p>
          </div>
        </div>
      </Container>
    );
  }

  // Enhanced error state with retry functionality
  if (error) {
    return (
      <Container className="min-h-screen text-white">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-400 mb-4">
              Error loading products: {error?.message || 'Unknown error'}
            </p>
            <button 
              onClick={() => {
                console.log("Retrying product fetch...");
                refetch();
              }}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </Container>
    );
  }

  // Show message if no products available
  if (!productData || productData.length === 0) {
    return (
      <Container className="min-h-screen text-white">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-400 mb-4">No products available</p>
            <button 
              onClick={() => {
                console.log("Retrying product fetch...");
                refetch();
              }}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className=" text-white">
      <div className="mx-auto">
        {/* Header Controls */}
        <ProductControls
          sortBy={sortBy}
          setSortBy={setSortBy}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          sortOptions={sortOptions}
          isMobileFilterOpen={isMobileFilterOpen}
          setIsMobileFilterOpen={setIsMobileFilterOpen}
          isFilterVisible={isFilterVisible}
          toggleFilterVisibility={toggleFilterVisibility}
          isAnimating={isAnimating}
        />

        {/* Mobile Filter Overlay */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[9999] lg:hidden">
            <div
              className={`mobile-filter-drawer fixed left-0 top-0 h-full w-[70%] overflow-y-auto transform transition-all duration-[500ms] ease-in-out ${
                isMobileFilterOpen ? "translate-x-0" : "translate-x-[-100%]"
              }`}
            >
              <div className="mt-16">
                <FilterSection isMobile={true} />
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex gap-4 relative overflow-hidden">
          {/* Desktop Filtering Sidebar */}
          <motion.div
            ref={filterRef}
            animate={filterAnimation}
            initial={{
              width: "16.666667%",
              opacity: 1,
              marginRight: "1rem",
              scale: 1,
            }}
            className="lg:block hidden transition-all overflow-hidden"
            style={{ width: "16.666667%", transformOrigin: "left center" }}
          >
            <div className="pr-">
              <FilterSection />
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            <div
              ref={gridRef}
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                isFilterVisible
                  ? "lg:grid-cols-3 xl:grid-cols-4"
                  : "lg:grid-cols-4 xl:grid-cols-4"
              } gap-x-3 gap-y-10 transition-all duration-1000 ease-in-out `}
              style={{
                transition: "all 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {products?.length > 0 ? (
                products?.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    isGridInView={isGridInView}
                    handleProductClick={handleProductClick}
                    handleAddToCart={handleAddToCart}
                    currentUser={currentUser}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 text-lg">
                    No products found matching your search.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CoralShopGrid;