import { baseApi } from "@/redux/baseApi";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFaq: builder.mutation({
      query: (faq) => ({
        url: "/faq/create",
        method: "POST",
        data: faq,
      }),
      invalidatesTags: ["FAQ"],
    }),

    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQ"],
    }),

    getFaqs: builder.query({
      query: () => ({
        url: "/faq",
        method: "GET",
      }),
      providesTags: ["FAQ"],
      transformResponse: (response) => response.data.data,
    }),
  }),
});

export const { useAddFaqMutation, useDeleteFaqMutation, useGetFaqsQuery } =
  faqApi;
