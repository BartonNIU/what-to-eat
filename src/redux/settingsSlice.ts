import { createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  darkMode: boolean;
  timeRemaining: number;
}

const initialState: SettingsState = {
  darkMode: false,
  timeRemaining: 60 * 5, //5mins
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleDark: (state) => {
      state.darkMode = !state.darkMode;
    },
    timeCountdown: (state) => {
      state.timeRemaining =
        state.timeRemaining > 0 ? state.timeRemaining - 1 : 0;
    },
    resetTimeRemaining: (state) => {
      state.timeRemaining = initialState.timeRemaining;
    },
  },
});

export const { toggleDark, timeCountdown, resetTimeRemaining } =
  settingsSlice.actions;

export default settingsSlice.reducer;
