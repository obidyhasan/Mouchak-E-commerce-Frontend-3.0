import { baseApi } from "@/redux/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/order/create",
        method: "POST",
        data: orderInfo,
      }),
      invalidatesTags: ["ORDER"],
    }),
    updateOrder: builder.mutation({
      query: ({ updateInfo, id }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        data: updateInfo,
      }),
      invalidatesTags: ["ORDER"],
    }),

    getOrders: builder.query({
      query: () => ({
        url: "/order/me",
        method: "GET",
      }),
      providesTags: ["ORDER"],
      transformResponse: (response) => response?.data?.data,
    }),

    getAllOrders: builder.query({
      query: (params) => ({
        url: "/order",
        method: "GET",
        params,
      }),
      providesTags: ["ORDER"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} = orderApi;
