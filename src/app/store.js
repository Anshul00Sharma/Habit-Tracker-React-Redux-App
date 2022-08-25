import { configureStore } from "@reduxjs/toolkit";
import goalReducer from "../features/goalSlice";

// store configuration
export const store = configureStore({
  reducer: {
    goals: goalReducer,
  },
});
