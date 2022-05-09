import { baseAPI } from "../feature/apiReducer";

const authAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ ...data }) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authAPI;
