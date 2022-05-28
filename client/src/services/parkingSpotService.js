import { baseAPI } from "../feature/apiReducer";
import io from "socket.io-client";
import { server } from "../constant/server";

const parkingSpotAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllParkingSpot: build.query({
      query: () => ({
        url: "/parking-spot",
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
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = io(server);
        try {
          await cacheDataLoaded;

          socket.on("addedSpot", (spot) => {
            updateCachedData((draft) => {
              draft.push(spot);
            });
          });
          socket.on("allSpots", (spots) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length);
              draft.push(...spots);
            });
          });
        } catch (error) {}

        await cacheEntryRemoved;

        socket.close();
      },
    }),
    addParkingSpot: build.mutation({
      query: ({ ...data }) => ({
        url: "/parking-spot",
        method: "POST",
        body: data,
      }),
    }),
    updateParkingSpot: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/parking-spot/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteParkingSpot: build.mutation({
      query: (id) => ({
        url: `/parking-spot/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllParkingSpotQuery,
  useAddParkingSpotMutation,
  useUpdateParkingSpotMutation,
  useDeleteParkingSpotMutation,
} = parkingSpotAPI;
