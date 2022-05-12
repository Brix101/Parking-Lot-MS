import { baseAPI } from "../feature/apiReducer";
import io from "socket.io-client";

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
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const socket = io("http://192.168.1.77:5000");
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
          socket.on("hello", (data) => {
            console.log(data);
          });
        } catch (error) {}

        await cacheEntryRemoved;

        socket.close();
      },
    }),
  }),
});

export const { useGetAllParkingSpotQuery } = parkingSpotAPI;
