"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import Container from "../share/Container";
import FilterSection from "./FilteringSection";
import ProductCard from "./ProductCard";
import ProductControls from "./ProductControls";
import {
  useGetProductsQuery,
  useUnlockProductOfCreditMutation,
} from "@/redux/featured/shop/shopApi";
import {
  useGetMyProfileQuery,
  useGetMyWalletQuery,
} from "@/redux/featured/auth/authApi";
import { saveProductToCart } from "../share/utils/cart";
import { saveToRecentViews } from "../share/utils/recentView";
import { getUserPlan } from "../share/utils/getUserPlan";
import { toast } from "sonner";

const CoralShopGrid = ({ defaultCategory }) => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [unlockProductOfCredit, { isLoading: unlocking }] =
    useUnlockProductOfCreditMutation();
  const [statusFilter, setStatusFilter] = useState("All");
  const { data: wallet } = useGetMyWalletQuery();
  const walletData = wallet?.data;
  const { plan, classes, svgColor } = getUserPlan(walletData);

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 300,
    availability: [],
    productType: [],
  });

  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: user } = useGetMyProfileQuery();
  const currentUser = user?.data;
  const userEmail = currentUser?.email;

  // Get search term from URL
  useEffect(() => {
    const urlSearchTerm = searchParams?.get("searchTerm") || "";
    setSearchTerm(urlSearchTerm);
  }, [searchParams]);

  const queryParams = useMemo(() => {
    const params = [];

    // Add search term if exists
    if (searchTerm && searchTerm.trim()) {
      params.push({ name: "searchTerm", value: searchTerm.trim() });
    }

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
  }, [filters, pageSize, currentPage, searchTerm]);

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
  console.log("All Products Data:", allProduct);

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
    return productData.map((item) => {
      let lockType = null;
      if (!item.isAvailable) {
        if (item.premiumMembership) lockType = "premium";
        else if (item.advanceMembership) lockType = "advanced";
        else lockType = "normal";
      } else if (item.isAvailable && item.creditNeeds > 0) {
        lockType = "credit";
      }
      return {
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
        available: item.isAvailable,
        creditNeeds: item.creditNeeds,
        membership: item.premiumMembership
          ? "premium"
          : item.advanceMembership
          ? "advanced"
          : "normal",
        description: item.description,
        stock: item.stock,
        lockType, // <-- new property
      };
    });
  }, [productData]);

  const handleProductClick = useCallback(
    (product) => {
      if (product.available && product.creditNeeds === 0) {
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

  const handleUnlockWithCredits = useCallback(
    async (product) => {
      console.log(product, "product");
      try {
        // Require login
        if (!currentUser) {
          router.push("/login");
          return;
        }

        const data = { itemId: product._id, credit: product.creditNeeds };
        console.log(data, "data");
        const res = await unlockProductOfCredit(data).unwrap();
        if (res.success) {
          toast.success("Product unlocked successfully");
        } else {
          toast.error("Product unlock failed");
        }

        console.log(res, "res");

        // On success, refetch products and navigate to product details
        await refetch();
        // router.push(`/shop/${product._id}`);
      } catch (err) {
        // Silently fail for now; optionally integrate a toast here
        // console.error("Failed to unlock product:", err);
      }
    },
    [currentUser, router, unlockProductOfCredit, refetch]
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
                    onUnlockWithCredits={handleUnlockWithCredits}
                    unlocking={unlocking}
                    currentUser={currentUser}
                  />
                ))
              )}
            </div>
            {allProduct?.meta?.totalPage > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {/* Prev */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === 1
                      ? "text-white/20 border border-white/20 cursor-not-allowed"
                      : `${classes.text} border-gray-600 hover:bg-gray-700`
                  }`}
                >
                  Prev
                </button>

                {/* Pages */}
                {Array.from(
                  { length: allProduct?.meta?.totalPage },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md border ${
                      page === currentPage
                        ? `${classes.bg} text-${classes.text2}`
                        : `${classes.text} border-gray-600 hover:bg-gray-700`
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, allProduct?.meta?.totalPage)
                    )
                  }
                  disabled={currentPage === allProduct?.meta?.totalPage}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === allProduct?.meta?.totalPage
                      ? "text-white/20 border border-white/20 cursor-not-allowed"
                      : `${classes.text} border-gray-600 hover:bg-gray-700`
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CoralShopGrid;
