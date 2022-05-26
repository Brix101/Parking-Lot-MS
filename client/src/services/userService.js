import { baseAPI } from "../feature/apiReducer";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: () => ({
        url: "/user",
      }),
    }),
  }),
});

export const { useGetUserQuery } = userAPI;
