import { baseAPI } from "../feature/apiReducer";
import io from "socket.io-client";

const parkingSpotAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllParkingSpot: build.query({
      query: () => ({
        url: "/parking-spot",
      }),
      transformResponse(response, meta) {
        const headers = meta.response.headers.get("X-Access-Token");
        localStorage.removeItem("X-Access-Token");
        if (headers) {
          localStorage.setItem("X-Access-Token", headers);
        }
        console.log(headers);
        return response;
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const socket = io("http://localhost:5000");
        try {
          await cacheDataLoaded;

          socket.on("addedSpot", (spot) => {
            updateCachedData((draft) => {
              draft.push(spot);
            });
          });

          socket.on("updateSpot", (spot) => {
            // updateCachedData((draft) => {
            //   draft.filter(spot);
            // });
          });
          socket.on("X-Access-Token", (token) => {
            console.log(token);
          });
        } catch (error) {}

        await cacheEntryRemoved;

        socket.close();
      },
    }),
  }),
});

export const { useGetAllParkingSpotQuery } = parkingSpotAPI;
