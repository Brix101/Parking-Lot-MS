import { baseAPI } from "../feature/apiReducer";

const authAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ ...data }) => ({
        url: "/login",
        method: "POST",
        body: data,
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
    }),
  }),
});

export const { useLoginMutation } = authAPI;
