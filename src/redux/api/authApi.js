import { api } from "../api/baseApi";

const authSlice = api.injectEndpoints({  // Inject the endpoints into the API
  endpoints: (builder) => ({  // Create the endpoints object
    otpVerify: builder.mutation({  // Create the mutation for verifying the OTP
      query: (data) => {  // Create the query object
        return { // Return the query object
          method: "POST", // Set the method of the request to POST
          url: "/auth/verify-email", // Set the URL of the API endpoint
          body: data, // Set the body of the request to the data
        };
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
          url: "/auth/forgot-password",
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
        const token = localStorage.getItem("reset_token");
        return {
          url: "/auth/reset-password",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}` || undefined,
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
          url: "/user",
          body: data,
        };
      },
    }),
    getUser: builder.query({
      query: (data) => {
        return {
          method: "GET",
          url: "/user/profile",
          body: data,
        };
      },
    }),

    profile: builder.query({
      query: () => ({
        method: "GET",
        url: "/user/profile",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
      providesTags: ["User"],
    }),
  }),
});

export const {
  useOtpVerifyMutation,
  useForgotPasswordMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useProfileQuery,
  useGetUserQuery,
  useLoginMutation
} = authSlice; // Export the hooks for the endpoints