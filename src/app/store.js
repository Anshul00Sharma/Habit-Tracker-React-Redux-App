import { configureStore } from "@reduxjs/toolkit";
import goalReducer from "../features/Goals/goalSlice";

// store configuration
export const store = configureStore({
  reducer: {
    goals: goalReducer,
  },
});
