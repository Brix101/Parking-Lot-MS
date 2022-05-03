import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../services/locationReducer";

export const store = configureStore({
  reducer: {
    location: locationReducer,
  },
});
