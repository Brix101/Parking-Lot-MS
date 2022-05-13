import { baseAPI } from "../feature/apiReducer";
import io from "socket.io-client";

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
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const socket = io("http://192.168.1.77:5000");
        // try {
        //   await cacheDataLoaded;

        //   socket.on("addedSpot", (spot) => {
        //     updateCachedData((draft) => {
        //       draft.push(spot);
        //     });
        //   });
        //   socket.on("allSpots", (spots) => {
        //     updateCachedData((draft) => {
        //       draft.splice(0, draft.length);
        //       draft.push(...spots);
        //     });
        //   });
        // } catch (error) {}

        await cacheEntryRemoved;

        socket.close();
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
