import { baseAPI } from "../feature/apiReducer";

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
    }),
  }),
});

export const { useGetAllParkingQuery } = parkingApi;
