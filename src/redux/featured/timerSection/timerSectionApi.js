import { api } from "@/redux/baseUrl/baseUrl";


const timerSectionApi = api.injectEndpoints({

  endpoints: (builder) => ({
    getTimerSectionData: builder.query({
      query: () => ({
        method: "GET",
        url: "/cm-point/get-reward",
      }),
      providesTags: ["TimerSection"],

    }),
    rewardClimb: builder.mutation({
      query: (id) => ({
        method: "POST",
        url: `/cm-point/claim-reward/${id}`,
       
      }),
      invalidatesTags: ["TimerSection","Wallet"],
    }),
  }),
});

export const { useGetTimerSectionDataQuery, useRewardClimbMutation } = timerSectionApi;


