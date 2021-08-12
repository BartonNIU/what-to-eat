import { configureStore } from "@reduxjs/toolkit";
import menusSlice from "./redux/menusSlice";
import settingsSlice from "./redux/settingsSlice";
import usersSlice from "./redux/usersSlice";

export const store = configureStore({
  reducer: {
    settings: settingsSlice,
    menus: menusSlice,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
