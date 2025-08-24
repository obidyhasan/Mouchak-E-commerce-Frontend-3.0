import { baseApi } from "@/redux/baseApi";

export const mouwalGalleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMouwalImage: builder.mutation({
      query: (image) => ({
        url: "/mouwal-gallery/create",
        method: "POST",
        data: image,
      }),
      invalidatesTags: ["GALLERY"],
    }),

    deleteMouwalImage: builder.mutation({
      query: (id) => ({
        url: `/mouwal-gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GALLERY"],
    }),

    getMouwalImages: builder.query({
      query: () => ({
        url: "/mouwal-gallery",
        method: "GET",
      }),
      providesTags: ["GALLERY"],
      transformResponse: (response) => response.data.data,
    }),
  }),
});

export const {
  useAddMouwalImageMutation,
  useDeleteMouwalImageMutation,
  useGetMouwalImagesQuery,
} = mouwalGalleryApi;
