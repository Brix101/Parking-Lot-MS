import { baseAPI } from "../feature/apiReducer";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: () => ({
        url: "/whoami",
      }),
    }),
    getAllUser: build.query({
      query: (name) => ({
        url: `/users?name=${name}`,
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetAllUserQuery } = userAPI;
