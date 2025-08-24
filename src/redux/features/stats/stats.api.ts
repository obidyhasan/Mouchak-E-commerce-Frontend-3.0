import { baseApi } from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    user: builder.query({
      query: () => ({
        url: "/stats/user",
        method: "GET",
      }),
      providesTags: ["STATS"],
      transformResponse: (response) => response.data,
    }),
    order: builder.query({
      query: () => ({
        url: "/stats/order",
        method: "GET",
      }),
      providesTags: ["STATS"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useUserQuery, useOrderQuery } = statsApi;
