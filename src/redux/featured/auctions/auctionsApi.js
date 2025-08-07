import { api } from "@/redux/baseUrl/baseUrl";

;

const auctionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAuctions: builder.query({
      query: () => ({
        method: "GET",
        url: "/auction/get-all-active-auctions",
      }),
      providesTags: ["Auctions"],
    }),
     getUpcomingAuctions: builder.query({
      query: () => ({
        method: "GET",
        url: "/auction/upcoming-auctions",
      }),
      providesTags: ["Auctions"],
    }),
     getMyAuctions: builder.query({
      query: () => ({
        method: "GET",
        url: "/auction/my-auctions",
      }),
      providesTags: ["Auctions"],
    }),
  }),
});

export const { useGetAllAuctionsQuery,useGetUpcomingAuctionsQuery,useGetMyAuctionsQuery } = auctionsApi;