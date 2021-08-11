import { createSlice } from "@reduxjs/toolkit";
import { combinedMeals } from "../constants/meals";

interface MealsState {
  darkMode: boolean;
}

const initialState = {
  meals: combinedMeals,
  mealKey: "home",
  clickedCount: 0,
  randomIndex: -1,
};

export const mealsSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    toggleMeal: (state) => {
      const keys = Object.keys(state.meals);
      state.mealKey =
        keys[
          keys.indexOf(state.mealKey) < keys.length - 1
            ? keys.indexOf(state.mealKey) + 1
            : 0
        ];
    },
    editMeal: (state, action) => {
      state.meals[state.mealKey] = state.meals[state.mealKey].filter(
        (item, index) => index !== action.payload.index
      );
    },
    updateClickedCount: (state) => {
      state.clickedCount += 1;
    },
    resetClickedCount: (state) => {
      state.clickedCount = 0;
    },
    updateRandomIndex: (state) => {
      //state.randomIndex = ;
    },
  },
});

export const { toggleMeal, editMeal, updateClickedCount, resetClickedCount } =
  mealsSlice.actions;

export default mealsSlice.reducer;
