import { api } from "@/redux/baseUrl/baseUrl";


const bannerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPromoCodes: builder.query({
        method: "GET",
      query: () => "/promo-codes/get-promos",
    }),
    claimPromoCode: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/promo/claim",
        body: data,
      }),
      invalidatesTags: ["Banners"],
    }),
    providesTags: ["Banners"],
  }),
});

export const { useGetPromoCodesQuery, useClaimPromoCodeMutation } = bannerApi;