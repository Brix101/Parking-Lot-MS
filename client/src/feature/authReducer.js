import { createSlice } from "@reduxjs/toolkit";

var token = localStorage.getItem("X-Access-Token");

const initialState = {
  token: token ? token : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
