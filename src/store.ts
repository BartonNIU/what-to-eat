import { configureStore } from "@reduxjs/toolkit";
import mealsSlice from "./redux/mealsSlice";
import settingsSlice from "./redux/settingsSlice";
import usersSlice from "./redux/usersSlice";

export const store = configureStore({
  reducer: {
    settings: settingsSlice,
    meals: mealsSlice,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
