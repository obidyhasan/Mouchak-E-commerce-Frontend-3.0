import { baseApi } from "@/redux/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/product/create",
        method: "POST",
        data: productInfo,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        data: formData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
    }),

    getProduct: builder.query({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
      providesTags: ["PRODUCT"],
      transformResponse: (response) => response.data.data,
    }),

    getSingleProduct: builder.query({
      query: (slug: string) => ({
        url: `/product/${slug}`,
        method: "GET",
      }),
      providesTags: ["PRODUCT"],
      transformResponse: (response) => response.data.product,
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
