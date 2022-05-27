import { baseAPI } from "../feature/apiReducer";
import io from "socket.io-client";
import { server } from "../constant/server";

const parkingApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllParking: build.query({
      query: (plateNumber) => ({
        url: `/parking?plateNumber=${plateNumber}`,
      }),
      transformResponse(response, meta) {
        const headers = meta.response.headers.get("authorization");
        if (headers) {
          localStorage.setItem("authorization", headers);
        }
        return response;
      },
      async onCacheEntryAdded({
        updateCachedData,
        cacheDataLoaded,
        cacheEntryRemoved,
      }) {
        const socket = io(server);
        try {
          await cacheDataLoaded;
          socket.on("allPakings", (parkingLogs) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length);
              draft.push(...parkingLogs);
            });
          });
        } catch (error) {}

        await cacheEntryRemoved;

        socket.close();
      },
    }),
  }),
});

export const { useGetAllParkingQuery } = parkingApi;
