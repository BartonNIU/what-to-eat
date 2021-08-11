import { createSlice } from "@reduxjs/toolkit";
import { CombinedMeals, combinedMeals } from "../constants/meals";

interface MealsState {
  meals: CombinedMeals;
  mealGroupKey: string;
  clickedCount: number;
  randomIndex: number;
  editMealGroupStatus: { [key: string]: boolean };
}

const initialState: MealsState = {
  meals: combinedMeals,
  mealGroupKey: "home",
  clickedCount: 0,
  randomIndex: -1,
  editMealGroupStatus: {},
};

export const mealsSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    toggleMeal: (state) => {
      const keys = Object.keys(state.meals);
      state.mealGroupKey =
        keys[
          keys.indexOf(state.mealGroupKey) < keys.length - 1
            ? keys.indexOf(state.mealGroupKey) + 1
            : 0
        ];
    },
    toggleEditMealGroup: (state, action) => {
      state.editMealGroupStatus[action.payload] =
        !!!state.editMealGroupStatus[action.payload];
    },
    editMeal: (state, action) => {
      console.log(action, action.payload);
      state.meals[action.payload.key] = state.meals[action.payload.key].filter(
        (item, index) => index !== +action.payload.index
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

export const {
  toggleMeal,
  editMeal,
  updateClickedCount,
  resetClickedCount,
  toggleEditMealGroup,
} = mealsSlice.actions;

export default mealsSlice.reducer;
