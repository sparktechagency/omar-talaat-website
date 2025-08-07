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
  }),
});

export const { useGetCategoriesQuery, useGetSingleCategoryQuery } = categoryApi;