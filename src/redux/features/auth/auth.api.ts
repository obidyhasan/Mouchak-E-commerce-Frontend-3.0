import { baseApi } from "@/redux/baseApi";
import type { ILogin, IResponse, IVerifyOtp } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<null>, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userInfo, id }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    allUsers: builder.query({
      query: (params) => ({
        url: "/user",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useUpdateUserMutation,
  useAllUsersQuery,
} = authApi;
