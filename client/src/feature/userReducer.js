import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: null,
  lastName: null,
  userName: null,
  email: null,
  isAdmin: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginUser: (state, action) => {
      console.log(action.payload);
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userName = action.payload.userName;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export const { setLoginUser } = userSlice.actions;

export const userIsAdmin = (state) => state.user.isAdmin;

export default userSlice.reducer;
