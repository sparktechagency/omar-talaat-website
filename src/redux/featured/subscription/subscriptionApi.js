import { api } from "@/redux/baseUrl/baseUrl";


const subscriptionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionApi: builder.query({
      query: () => ({
        method: "GET",
        url: "/package/get-package",
      }),
      providesTags: ["Subscription"],
    }),
    subscriptionCheckout: builder.mutation({
      query: (id) => ({
        method: "POST",
        url: `/subscription/create-checkout-session/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Subscription", id }],
    }),
  }),
});

export const { useGetSubscriptionApiQuery, useSubscriptionCheckoutMutation } = subscriptionApi;