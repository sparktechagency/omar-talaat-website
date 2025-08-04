import { api } from "@/redux/baseUrl/baseUrl";



const recentAddedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecentAdded: builder.query({
        method: "GET",
      query: () => "/inventory/resent-products",
    }),
 invalidatesTags: ["RecentAdded"],
  }),
});

export const { useGetRecentAddedQuery } = recentAddedApi;