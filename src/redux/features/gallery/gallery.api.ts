import { baseApi } from "@/redux/baseApi";

export const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addImage: builder.mutation({
      query: (image) => ({
        url: "/gallery/create",
        method: "POST",
        data: image,
      }),
      invalidatesTags: ["GALLERY"],
    }),

    deleteImage: builder.mutation({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GALLERY"],
    }),

    getImages: builder.query({
      query: () => ({
        url: "/gallery",
        method: "GET",
      }),
      providesTags: ["GALLERY"],
      transformResponse: (response) => response.data.data,
    }),
  }),
});

export const {
  useAddImageMutation,
  useDeleteImageMutation,
  useGetImagesQuery,
} = galleryApi;
