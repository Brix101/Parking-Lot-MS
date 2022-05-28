import { baseAPI } from "../feature/apiReducer";

const authAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ ...data }) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response, meta) => {
        localStorage.removeItem("authorization");
        const headers = meta.response.headers.get("authorization");
        if (headers) {
          localStorage.setItem("authorization", headers);
        }
        return response;
      },
    }),
    logout: build.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authAPI;
