import { api } from "@/redux/baseUrl/baseUrl";

const shopApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products
    getProducts: builder.query({
      query: () => {
        

        return {
          method: "GET",
          url: `/inventory/get-all`,
        };
      },
      providesTags: ["Products"],
    }),

    // Get single product by ID
    getProductById: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/inventory/getSingle/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    // Get featured products
    getFeaturedProducts: builder.query({
      query: () => ({
        method: "GET",
        url: "/products/featured",
      }),
      providesTags: ["Products"],
    }),

    // Get products by category
    getProductsByCategory: builder.query({
      query: (category) => ({
        method: "GET",
        url: `/products/category/${category}`,
      }),
      providesTags: ["Products"],
    }),

    // Get all categories
    getCategories: builder.query({
      query: () => ({
        method: "GET",
        url: "/categories",
      }),
      providesTags: ["Categories"],
    }),

    // Search products
    searchProducts: builder.query({
      query: (searchTerm) => ({
        method: "GET",
        url: `/products/search?q=${encodeURIComponent(searchTerm)}`,
      }),
      providesTags: ["Products"],
    }),

    // Get related products
    getRelatedProducts: builder.query({
      query: (productId) => ({
        method: "GET",
        url: `/products/${productId}/related`,
      }),
      providesTags: ["Products"],
    }),

    // Add product review (if needed)
    addProductReview: builder.mutation({
      query: ({ productId, reviewData }) => ({
        method: "POST",
        url: `/products/${productId}/reviews`,
        body: reviewData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Products", id: productId }
      ],
    }),

    // Get product reviews
    getProductReviews: builder.query({
      query: (productId) => ({
        method: "GET",
        url: `/products/${productId}/reviews`,
      }),
      providesTags: (result, error, productId) => [
        { type: "Reviews", id: productId }
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetFeaturedProductsQuery,
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
  useSearchProductsQuery,
  useGetRelatedProductsQuery,
  useAddProductReviewMutation,
  useGetProductReviewsQuery,
} = shopApi;