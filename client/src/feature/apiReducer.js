import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../constant/server";

export const baseAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api`,
    prepareHeaders(headers) {
      var token = localStorage.getItem("authorization");

      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
    credentials: "include",
  }),
  endpoints: () => ({}),
});
