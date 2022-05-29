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
    addUser: build.mutation({
      query: ({ ...data }) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetAllUserQuery, useAddUserMutation } =
  userAPI;
