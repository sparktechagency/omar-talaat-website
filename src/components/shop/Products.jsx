"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Container from "../share/Container";
import FilterSection from "./FilteringSection";
import ProductCard from "./ProductCard";
import ProductControls from "./ProductControls";
import { useGetProductsQuery } from "@/redux/featured/shop/shopApi";
import { useGetMyProfileQuery } from "@/redux/featured/auth/authApi";
import { saveProductToCart } from "../share/utils/cart";
import { saveToRecentViews } from "../share/utils/recentView";

const CoralShopGrid = ({ defaultCategory }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  // const [queryParams, setQueryParams] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 300,
    availability: [],
    productType: [],
  });

  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: user } = useGetMyProfileQuery();
  const currentUser = user?.data;
  const userEmail = currentUser?.email;

  const queryParams = useMemo(() => {
    const params = [];

    if (filters.productType.length > 0) {
      params.push({
        name: "productType",
        value: filters.productType.join(","),
      });
    }

    if (filters.availability.length > 0) {
      if (filters.availability.includes("inStock")) {
        params.push({ name: "isStock", value: true });
      } else if (filters.availability.includes("outOfStock")) {
        params.push({ name: "isStock", value: false });
      }
    }

    params.push({ name: "minPrice", value: filters.minPrice });
    params.push({ name: "maxPrice", value: filters.maxPrice });

    if (filters.categories) {
      params.push({ name: "categories", value: filters.categories });
    }

    params.push({ name: "limit", value: pageSize });
    params.push({ name: "page", value: currentPage });

    return params;
  }, [filters, pageSize, currentPage]);

  useEffect(() => {
    if (defaultCategory && !filters.categories) {
      setFilters((prev) => ({
        ...prev,
        categories: defaultCategory,
      }));
    }
  }, [defaultCategory]);

  const handleFilterChange = (updatedFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
      categories: defaultCategory || prev.categories,
    }));
  };

  // useEffect(() => {
  //   if (defaultCategory) {
  //     setFilters((prev) => ({
  //       ...prev,
  //       categories: defaultCategory,
  //     }));
  //   }
  // }, [defaultCategory]);

  const {
    data: allProduct,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: true,
  });
  // console.log("All Products Data:", allProduct);

  const productData = allProduct?.data || [];

  const router = useRouter();
  const dispatch = useDispatch();

  const gridRef = useRef(null);
  const filterRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });
  const filterAnimation = useAnimation();
  // console.log(filters)

  const sortOptions = [];

  // Force refetch
  useEffect(() => {
    if (!isLoading && !productData.length && !error) {
      refetch();
    }
  }, [isLoading, productData.length, error, refetch]);

  // Mobile filter close outside click
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileFilterOpen]);

  // Prevent body scroll when filter open
  useEffect(() => {
    document.body.style.overflow = isMobileFilterOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileFilterOpen]);

  // Filter toggle animation
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
          setTimeout(() => setIsAnimating(false), 100);
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
          .then(() => setTimeout(() => setIsAnimating(false), 100));
      }, 10);
    }
  };

  // Initial filter animation
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

  const products = React.useMemo(() => {
    if (!productData || !Array.isArray(productData)) return [];
    return productData.map((item) => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      images: item.images,
      status:
        item.status === "active"
          ? item.isStock
            ? "In Stock"
            : "Out of Stock"
          : item.status,
      available:
        item.creditNeeds === 0 &&
        !item.premiumMembership &&
        !item.advanceMembership,
      creditNeeds: item.creditNeeds,
      membership: item.premiumMembership
        ? "premium"
        : item.advanceMembership
        ? "advanced"
        : "normal",
      description: item.description,
      stock: item.stock,
    }));
  }, [productData]);

  const handleProductClick = useCallback(
    (product) => {
      if (userEmail && product) {
        saveToRecentViews(product, userEmail);
      }
      if (product.available) {
        router.push(`/shop/${product._id}`);
      }
    },
    [userEmail, router]
  );

  const handleAddToCart = useCallback(
    (e, product) => {
      e.stopPropagation();
      saveProductToCart(product, userEmail);
    },
    [userEmail]
  );

  if (error) {
    return (
      <Container className="min-h-screen text-white">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-400 mb-4">
              Error loading products: {error?.message || "Unknown error"}
            </p>
            <button
              onClick={() => refetch()}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </Container>
    );
  }

  // We'll handle empty product data in the main render instead of returning early

  return (
    <Container className="text-white">
      <div className="mx-auto">
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

        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[9999] lg:hidden">
            <div
              className={`mobile-filter-drawer fixed left-0 top-0 h-full w-[70%] overflow-y-auto transform transition-all duration-[500ms] ease-in-out ${
                isMobileFilterOpen ? "translate-x-0" : "translate-x-[-100%]"
              }`}
            >
              <div className="mt-16">
                <FilterSection
                  isMobile={true}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 relative overflow-hidden">
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
            <FilterSection onFilterChange={handleFilterChange} />
          </motion.div>

          <div className="flex-1">
            <div
              ref={gridRef}
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                isFilterVisible
                  ? "lg:grid-cols-3 xl:grid-cols-4"
                  : "lg:grid-cols-4 xl:grid-cols-4"
              } gap-x-3 gap-y-10 transition-all duration-1000 ease-in-out`}
            >
              {!productData || products?.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 text-lg">No products available</p>
                  <button
                    onClick={() => refetch()}
                    className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors mt-4"
                  >
                    Refresh
                  </button>
                </div>
              ) : (
                products.map((product, index) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    index={index}
                    isGridInView={isGridInView}
                    handleProductClick={handleProductClick}
                    handleAddToCart={handleAddToCart}
                    currentUser={currentUser}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CoralShopGrid;
