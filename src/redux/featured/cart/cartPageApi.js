import { api } from "@/redux/baseUrl/baseUrl";

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    applyPromoCode: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/promo/validate",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    payment: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/product-orders/create-and-checkout",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    getMyOrder: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((arg) => {
            params.append(arg.name, arg.value);
          });
        }
        return {
          method: "GET",
          url: "/product-orders/my-orders",
          params,
        };
      },
      providesTags: ["Cart"],
    }),
  }),
});

export const {
  useApplyPromoCodeMutation,
  usePaymentMutation,
  useGetMyOrderQuery,
} = cartApi;
