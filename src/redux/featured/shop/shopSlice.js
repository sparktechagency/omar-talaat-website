import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Products state
  products: [],
  featuredProducts: [],
  currentProduct: null,
  relatedProducts: [],
  
  // Categories state
  categories: [],
  selectedCategory: null,
  
  // Filters and search
  filters: {
    category: "",
    search: "",
    sort: "newest", // newest, oldest, price-low, price-high, popular
    minPrice: 0,
    maxPrice: 0,
    priceRange: [0, 10000],
  },
  
  // Pagination
  pagination: {
    currentPage: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },
  
  // UI States
  loading: {
    products: false,
    categories: false,
    currentProduct: false,
    featuredProducts: false,
  },
  
  error: {
    products: null,
    categories: null,
    currentProduct: null,
    featuredProducts: null,
  },
  
  // View preferences
  viewMode: "grid", // grid, list
  productsPerPage: 12,
  
  // Wishlist (if needed)
  wishlist: [],
  
  // Recently viewed products
  recentlyViewed: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    // Products actions
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading.products = false;
      state.error.products = null;
    },
    
    setProductsLoading: (state, action) => {
      state.loading.products = action.payload;
    },
    
    setProductsError: (state, action) => {
      state.error.products = action.payload;
      state.loading.products = false;
    },
    
    // Featured products
    setFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
      state.loading.featuredProducts = false;
      state.error.featuredProducts = null;
    },
    
    setFeaturedProductsLoading: (state, action) => {
      state.loading.featuredProducts = action.payload;
    },
    
    // Current product
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
      state.loading.currentProduct = false;
      state.error.currentProduct = null;
      
      // Add to recently viewed
      if (action.payload && !state.recentlyViewed.find(p => p.id === action.payload.id)) {
        state.recentlyViewed.unshift(action.payload);
        // Keep only last 10 viewed products
        state.recentlyViewed = state.recentlyViewed.slice(0, 10);
      }
    },
    
    setCurrentProductLoading: (state, action) => {
      state.loading.currentProduct = action.payload;
    },
    
    setCurrentProductError: (state, action) => {
      state.error.currentProduct = action.payload;
      state.loading.currentProduct = false;
    },
    
    // Related products
    setRelatedProducts: (state, action) => {
      state.relatedProducts = action.payload;
    },
    
    // Categories
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.loading.categories = false;
      state.error.categories = null;
    },
    
    setCategoriesLoading: (state, action) => {
      state.loading.categories = action.payload;
    },
    
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filters.category = action.payload;
    },
    
    // Filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1; // Reset to first page when filters change
    },
    
    setSearchTerm: (state, action) => {
      state.filters.search = action.payload;
      state.pagination.currentPage = 1;
    },
    
    setSortOption: (state, action) => {
      state.filters.sort = action.payload;
      state.pagination.currentPage = 1;
    },
    
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
      state.filters.minPrice = action.payload[0];
      state.filters.maxPrice = action.payload[1];
      state.pagination.currentPage = 1;
    },
    
    clearFilters: (state) => {
      state.filters = {
        category: "",
        search: "",
        sort: "newest",
        minPrice: 0,
        maxPrice: 0,
        priceRange: [0, 10000],
      };
      state.selectedCategory = null;
      state.pagination.currentPage = 1;
    },
    
    // Pagination
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    
    setProductsPerPage: (state, action) => {
      state.productsPerPage = action.payload;
      state.pagination.limit = action.payload;
      state.pagination.currentPage = 1;
    },
    
    // View mode
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    
    // Wishlist actions
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!state.wishlist.find(item => item.id === product.id)) {
        state.wishlist.push(product);
        
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
        }
      }
    },
    
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.wishlist = state.wishlist.filter(item => item.id !== productId);
      
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      }
    },
    
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const existingIndex = state.wishlist.findIndex(item => item.id === product.id);
      
      if (existingIndex !== -1) {
        state.wishlist.splice(existingIndex, 1);
      } else {
        state.wishlist.push(product);
      }
      
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      }
    },
    
    initializeWishlist: (state) => {
      if (typeof window !== "undefined") {
        const wishlist = localStorage.getItem("wishlist");
        if (wishlist) {
          try {
            state.wishlist = JSON.parse(wishlist);
          } catch {
            state.wishlist = [];
          }
        }
      }
    },
    
    // Recently viewed
    clearRecentlyViewed: (state) => {
      state.recentlyViewed = [];
    },
    
    // Clear all errors
    clearAllErrors: (state) => {
      state.error = {
        products: null,
        categories: null,
        currentProduct: null,
        featuredProducts: null,
      };
    },
    
    // Reset shop state
    resetShopState: (state) => {
      return { ...initialState, wishlist: state.wishlist, recentlyViewed: state.recentlyViewed };
    },
  },
});

export const {
  setProducts,
  setProductsLoading,
  setProductsError,
  setFeaturedProducts,
  setFeaturedProductsLoading,
  setCurrentProduct,
  setCurrentProductLoading,
  setCurrentProductError,
  setRelatedProducts,
  setCategories,
  setCategoriesLoading,
  setSelectedCategory,
  setFilters,
  setSearchTerm,
  setSortOption,
  setPriceRange,
  clearFilters,
  setPagination,
  setCurrentPage,
  setProductsPerPage,
  setViewMode,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  initializeWishlist,
  clearRecentlyViewed,
  clearAllErrors,
  resetShopState,
} = shopSlice.actions;

export default shopSlice.reducer;

// Selectors
export const selectProducts = (state) => state.shop.products;
export const selectFeaturedProducts = (state) => state.shop.featuredProducts;
export const selectCurrentProduct = (state) => state.shop.currentProduct;
export const selectRelatedProducts = (state) => state.shop.relatedProducts;
export const selectCategories = (state) => state.shop.categories;
export const selectSelectedCategory = (state) => state.shop.selectedCategory;
export const selectFilters = (state) => state.shop.filters;
export const selectPagination = (state) => state.shop.pagination;
export const selectLoading = (state) => state.shop.loading;
export const selectError = (state) => state.shop.error;
export const selectViewMode = (state) => state.shop.viewMode;
export const selectWishlist = (state) => state.shop.wishlist;
export const selectRecentlyViewed = (state) => state.shop.recentlyViewed;