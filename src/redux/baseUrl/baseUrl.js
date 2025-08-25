import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://10.10.7.62:7005/api/v1", // Change this to your server URL
    // baseUrl: "https://www.api.coralstash.com/api/v1", // Change this to your server URL
    prepareHeaders: (headers) => {
      // Add the token to the headers
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "RecentAdded",
    "Products",
    "Categories",
    "Cart",
    "User",
    "Wallet",
    "Leaderboard",
    "Auctions",


    "Subscription",
  ],
});

export const imageUrl = "https://www.api.coralstash.com"; 
