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
          socket.on("allUser", (user) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length);
              draft.push(...user);
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
    updateUser: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
} = userAPI;
