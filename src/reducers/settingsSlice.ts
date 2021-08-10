import { createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  darkMode: boolean;
}

const initialState: SettingsState = {
  darkMode: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleDark: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDark } = settingsSlice.actions;

export default settingsSlice.reducer;
