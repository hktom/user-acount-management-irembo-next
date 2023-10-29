import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../redux/auth/authSlice";
import homeSlice from "../redux/home/homeSlice";

export const rootReducer = combineReducers({
  auth: authSlice,
  home: homeSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
