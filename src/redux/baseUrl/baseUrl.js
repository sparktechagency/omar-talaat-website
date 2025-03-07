import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://217.15.175.61:5000/api/v1", // Change this to your server URL
    prepareHeaders: (headers) => { // Add the token to the headers
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const imageUrl = "http://217.15.175.61:5000"; // Change this to your server URL