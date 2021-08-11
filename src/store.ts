import { configureStore } from "@reduxjs/toolkit";
import mealsSlice from "./redux/mealsSlice";
import settingsSlice from "./redux/settingsSlice";

export const store = configureStore({
  reducer: {
    settings: settingsSlice,
    meals: mealsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
