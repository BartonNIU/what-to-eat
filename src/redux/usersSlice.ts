import { createSlice } from "@reduxjs/toolkit";

interface UsersState {
  isLogin: boolean;
}

const initialState: UsersState = {
  isLogin: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    checkLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { checkLogin } = usersSlice.actions;

export default usersSlice.reducer;
