import { baseAPI } from "../feature/apiReducer";
import io from "socket.io-client";

const parkingApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllParking: build.query({
      query: () => ({
        url: "/parking",
      }),
      transformResponse(response, meta) {
        const headers = meta.response.headers.get("authorization");
        if (headers) {
          localStorage.setItem("authorization", headers);
        }
        return response;
      },
    }),
  }),
});

export const { useGetAllParkingQuery } = parkingApi;
