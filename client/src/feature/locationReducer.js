import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getParkingSpots = createAsyncThunk({});

const initialState = {
  entities: [],
  loading: false,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
// export const { } =
//   locationSlice.actions;

export default locationSlice.reducer;
