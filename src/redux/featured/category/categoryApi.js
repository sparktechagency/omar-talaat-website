import { api } from "@/redux/baseUrl/baseUrl";

const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
        method: "GET",
      query: () => "/categories/get-category",
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;