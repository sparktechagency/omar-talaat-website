import { api } from "@/redux/baseUrl/baseUrl";

const galleryApi = api.injectEndpoints({

  endpoints: (builder) => ({
    getGallery: builder.query({
      query: (searchTerm) => {
        const params = new URLSearchParams();
        if (searchTerm) {
          params.append('searchTerm', searchTerm);
        }
        const queryString = params.toString();
        return {
          method: "GET",
          url: `/gallery/get-gallery${queryString ? `?${queryString}` : ''}`,
        };
      },
    }),
 invalidatesTags: ["RecentAdded"],
  }),
});

export const {useGetGalleryQuery } = galleryApi;
