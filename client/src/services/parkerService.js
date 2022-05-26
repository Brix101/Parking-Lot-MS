import { baseAPI } from "../feature/apiReducer";
import io from "socket.io-client";
import { server } from "../constant/server";

const parkerApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllParker: build.query({
      query: () => ({
        url: "/parker",
      }),
      transformResponse(response, meta) {
        const headers = meta.response.headers.get("authorization");
        if (headers) {
          localStorage.setItem("authorization", headers);
        }
        return response;
      },
    }),
    getAllParkerImage: build.query({
      query: (plateNumber) => ({
        url: `/parker/${plateNumber}`,
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
  useGetAllParkerImageQuery,
  useUpdateParkerMutation,
} = parkerApi;
