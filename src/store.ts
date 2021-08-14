import { configureStore } from "@reduxjs/toolkit";
import menusSlice from "./redux/menusSlice";
import settingsSlice from "./redux/settingsSlice";
import usersSlice from "./redux/usersSlice";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("what-to-eat");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error);

    return undefined;
  }
};

const saveToLocalStorage = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("what-to-eat", serializedState);
  } catch (error) {
    console.error(error);
  }
};

export const store = configureStore({
  reducer: {
    settings: settingsSlice,
    menus: menusSlice,
    users: usersSlice,
  },
  preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
