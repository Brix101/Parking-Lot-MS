import { baseAPI } from "../feature/apiReducer";

const parkerApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllParker: build.query({
      query: (plateNumber) => ({
        url: `/parker?plateNumber=${plateNumber}`,
      }),
      transformResponse(response, meta) {
        const headers = meta.response.headers.get("authorization");
        if (headers) {
          localStorage.setItem("authorization", headers);
        }
        return response;
      },
    }),
    getAllParkerData: build.query({
      query: (plateNumber) => ({
        url: `/plate/${plateNumber}`,
      }),
      transformResponse(response, meta) {
        const headers = meta.response.headers.get("authorization");
        if (headers) {
          localStorage.setItem("authorization", headers);
        }
        return response;
      },
    }),
    updateParker: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/parker/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllParkerQuery,
  useGetAllParkerDataQuery,
  useUpdateParkerMutation,
} = parkerApi;
