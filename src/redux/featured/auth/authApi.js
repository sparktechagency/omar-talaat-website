import { api } from "@/redux/baseUrl/baseUrl";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    otpVerify: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/verify-email",
          body: data,
        };
      },
    }),
    register: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/users",
          body: data,
        };
      },
      transformResponse: (data) => {
        return data;
      },
      transformErrorResponse: ({ data }) => {
        const { message } = data;
        return message;
      },
    }),

    login: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/login",
          body: data,
        };
      },
      transformResponse: (data) => {
        return data;
      },
      transformErrorResponse: ({ data }) => {
        const { message } = data;
        return message;
      },
    }),

    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/forget-password",
          body: data,
        };
      },
    }),
    resendOtp: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/resend-otp",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        const resetToken = localStorage.getItem("verifyToken");
        return {
          url: "/auth/reset-password",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            resetToken: `${resetToken}` || undefined,
          },
          body: data,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/change-password",
          body: data,
        };
      },
    }),

    updateProfile: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/users/profile",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
    // getUser: builder.query({
    //   query: (data) => {
    //     return {
    //       method: "GET",
    //       url: "/user/profile",
    //       body: data,
    //     };
    //   },
    // }),

    getMyProfile: builder.query({
      query: () => ({
        method: "GET",
        url: "/users/profile",
      }),
   
      providesTags: ["User"],
    }),
    getMyWallet: builder.query({
      query: () => ({
        method: "GET",
        url: "/wallet/get",
      }),
   
      providesTags: ["Wallet"],

    }),
    getLeaderboard: builder.query({
      query: () => ({
        method: "GET",
        url: "/wallet/leaderboard",
      }),
   
      providesTags: ["Leaderboard"],

    }),
  }),
});

export const {
  useOtpVerifyMutation,
  useForgotPasswordMutation,
  useRegisterMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useGetMyProfileQuery,
  useGetMyWalletQuery,
  useGetLeaderboardQuery,
  useLoginMutation,
} = authSlice;
