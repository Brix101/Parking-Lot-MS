import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.77:5000/api/",
    prepareHeaders(headers, { getState }) {
      // const token = getState().auth.token;
      var token = localStorage.getItem("authorization");

      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
    credentials: "include",
  }),
  endpoints: () => ({}),
});
