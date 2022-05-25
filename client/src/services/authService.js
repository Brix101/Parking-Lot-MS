import { baseAPI } from "../feature/apiReducer";
import { setUser } from "../feature/userReducer";

const authAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ ...data }) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response, meta) => {
        const headers = meta.response.headers.get("authorization");
        if (headers) {
          localStorage.setItem("authorization", headers);
        }
        return response;
      },
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch, getCacheEntry }
      ) {
        try {
          await cacheDataLoaded;
          const data = getCacheEntry().data;

          dispatch(setUser(data.user));

          await cacheEntryRemoved;
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: build.query({
      query: () => ({
        url: "/logout",
      }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch, getCacheEntry }
      ) {
        try {
          await cacheDataLoaded;
          const data = getCacheEntry().data;

          dispatch(setUser(data.user));

          await cacheEntryRemoved;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutQuery } = authAPI;
