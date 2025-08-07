import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.7.62:7005/api/v1", // Change this to your server URL
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
  tagTypes: ["RecentAdded", "Products", "Categories", "Cart", "User"],
});

export const imageUrl = "http://10.10.7.62:7005"; 
