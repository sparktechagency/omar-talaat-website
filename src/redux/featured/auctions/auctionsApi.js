import { api } from "@/redux/baseUrl/baseUrl";

const auctionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAuctions: builder.query({
      query: (searchTerm) => {
        const params = new URLSearchParams();
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        const queryString = params.toString();
        return {
          method: "GET",
          url: `/auction/get-all-active-auctions${
            queryString ? `?${queryString}` : ""
          }`,
        };
      },
      providesTags: ["Auctions"],
    }),
    getUpcomingAuctions: builder.query({
      query: (searchTerm) => {
        const params = new URLSearchParams();
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        const queryString = params.toString();
        return {
          method: "GET",
          url: `/auction/upcoming-auctions${
            queryString ? `?${queryString}` : ""
          }`,
        };
      },
      providesTags: ["Auctions"],
    }),
    getMyAuctions: builder.query({
      query: (searchTerm) => {
        const params = new URLSearchParams();
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        const queryString = params.toString();
        return {
          method: "GET",
          url: `/auction/my-auctions${queryString ? `?${queryString}` : ""}`,
        };
      },
      providesTags: ["Auctions"],
    }),
    unlockAuction: builder.mutation({
      query: ({ id, data }) => ({
        method: "POST",
        url: `/auction/taking/unlock/${id}`,
        body: data,
      }),
      invalidatesTags: ["Auctions"],
    }),

    createBidAuction: builder.mutation({
      query: ({ id, data }) => ({
        method: "POST",
        url: `/auction/bid/create/${id}`,
        body: data,
      }),
      invalidatesTags: ["Auctions"],
    }),
  }),
});

export const {
  useGetAllAuctionsQuery,
  useGetUpcomingAuctionsQuery,
  useGetMyAuctionsQuery,
  useUnlockAuctionMutation,
  useCreateBidAuctionMutation,
} = auctionsApi;
