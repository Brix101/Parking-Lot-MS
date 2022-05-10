import { baseAPI } from "../feature/apiReducer";

const authAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ ...data }) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response, meta, args) => {
        const header = meta.response.headers;
        console.log("Hello ", header.get("x-access-token"));
        // return response;
      },
    }),
  }),
});

export const { useLoginMutation } = authAPI;
