import { AuthAction } from "@/config/helpers/enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  token: string | null;
  message: string | null;
  status: number | null;
  action: AuthAction | null;
}

const initialState: AuthState = {
  loading: false,
  token: null,
  message: null,
  status: null,
  action: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      payload: PayloadAction<{
        token: string;
      }>
    ) => {
      state.loading = true;
      state.action = AuthAction.LOGIN;
    },
    login_multi_factor: (
      state,
      payload: PayloadAction<{
        email: string;
        password: string;
      }>
    ) => {
      state.loading = true;
      state.action = AuthAction.LOGIN_MULTI_FACTOR;
    },
    logout: (state) => {
      state.loading = true;
      state.action = AuthAction.LOGOUT;
    },
    register: (state, payload: PayloadAction<any>) => {
      state.loading = true;
      state.action = AuthAction.REGISTER;
    },
    forgot_password: (state) => {
      state.loading = true;
      state.action = AuthAction.FORGOT_PASSWORD;
    },
    reset_password: (state) => {
      state.loading = true;
      state.action = AuthAction.RESET_PASSWORD;
    },
    update_password: (state, action: PayloadAction<{}>) => {
      state.action = AuthAction.UPDATE_PASSWORD;
    },
    auth_callback: (
      state,
      action: PayloadAction<{
        token?: string | null;
        message?: string | null;
        status?: number | null;
        action?: AuthAction | null;
      }>
    ) => {
      state.loading = false;
      state.token = action.payload.token || state.token;
      state.message = action.payload.message || state.message;
      state.status = action.payload.status || state.status;
      state.action = action.payload.action || state.action;
    },
    loading: (state) => {
      state.loading = true;
      state.action = AuthAction.LOADING;
    },
  },
});

export const {
  login,
  logout,
  register,
  forgot_password,
  reset_password,
  auth_callback,
  loading,
  login_multi_factor,
  update_password,
} = authSlice.actions;

export default authSlice.reducer;
