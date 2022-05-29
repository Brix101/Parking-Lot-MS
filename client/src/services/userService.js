import { baseAPI } from "../feature/apiReducer";
import io from "socket.io-client";
import { server } from "../constant/server";

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
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = io(server);
        try {
          await cacheDataLoaded;

          socket.on("addedUser", (user) => {
            updateCachedData((draft) => {
              draft.push(user);
            });
          });
        } catch (error) {}

        await cacheEntryRemoved;

        socket.close();
      },
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
