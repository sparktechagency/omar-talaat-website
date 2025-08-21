import { api } from "@/redux/baseUrl/baseUrl";

const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        method: "GET",
        url: "/categories/get-category",
      }),
      providesTags: ["Categories"],
    }),
    getSingleCategory: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/categories/get-single-category/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Categories", id }],
    }),
    forAccessRequest: builder.mutation({
      query: (otp) => ({
        method: "POST",
        url: `/vault/request-vault-access`,
        body: {
          otp
        },
        invalidatesTags: ["Categories"],
      }),
      providesTags: (result, error, id) => [{ type: "Categories", id }],
    }),
    unlockTheVault: builder.mutation({
      query: (otp) => ({
        method: "POST",
        url: `/vault/verify-vault-otp`,
        body: {
          otp
        },
        invalidatesTags: ["Wallet", "Categories"],


      }),
      providesTags: (result, error, id) => [{ type: "Categories", id }],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetSingleCategoryQuery,
  useUnlockTheVaultMutation, useForAccessRequestMutation


 } = categoryApi;