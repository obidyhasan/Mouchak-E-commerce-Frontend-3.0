import { baseApi } from "@/redux/baseApi";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/cart/create",
        method: "POST",
        data: cartInfo,
      }),
      invalidatesTags: ["CART"],
    }),

    getCarts: builder.query({
      query: () => ({
        url: "/cart/me",
        method: "GET",
      }),
      providesTags: ["CART"],
    }),
  }),
});

export const { useAddCartMutation, useGetCartsQuery } = cartApi;
