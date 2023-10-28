import { AuthAction } from "@/config/helpers/enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface AuthState {
  loading: boolean;
  token: string | null;
  message: string | null;
  status: number | null;
  method: AuthAction | null;
}

const initialState: AuthState = {
  loading: false,
  token: null,
  message: null,
  status: null,
  method: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
      state.method = AuthAction.LOGIN;
    },
    logout: (state) => {
      state.loading = true;
      state.method = AuthAction.LOGOUT;
    },
    register: (state) => {
      state.loading = true;
      state.method = AuthAction.REGISTER;
    },
    forgot_password: (state) => {
      state.loading = true;
      state.method = AuthAction.FORGOT_PASSWORD;
    },
    reset_password: (state) => {
      state.loading = true;
      state.method = AuthAction.RESET_PASSWORD;
    },
    auth_callback: (
      state,
      action: PayloadAction<{
        token: string | null;
        message: string | null;
        status: number | null;
        action : AuthAction | null;
      }>
    ) => {
      state.loading = false;
      state.token = action.payload.token;
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.method = action.payload.action;
    },
    loading: (state) => {
      state.loading = true;
      state.method = AuthAction.LOADING;
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
} = authSlice.actions;

export default authSlice.reducer;
