import { baseAPI } from "../feature/apiReducer";
import io from "socket.io-client";

const parkingSpotAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllParkingSpot: build.query({
      query: () => "/parking-spot",
      transformResponse: (response, meta, args) => {
        const headers = meta.response.headers.get("x-access-token");
        return { response, headers };
      },
      // async onCacheEntryAdded(
      //   arg,
      //   { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      // ) {
      //   const socket = io("http://localhost:5000");
      //   try {
      //     await cacheDataLoaded;

      //     socket.on("addedSpot", (spot) => {
      //       updateCachedData((draft) => {
      //         draft.push(spot);
      //       });
      //     });

      //     socket.on("updateSpot", (spot) => {
      //       // updateCachedData((draft) => {
      //       //   draft.filter(spot);
      //       // });
      //     });
      //   } catch (error) {}

      //   await cacheEntryRemoved;

      //   socket.close();
      // },
    }),
  }),
});

export const { useGetAllParkingSpotQuery } = parkingSpotAPI;
