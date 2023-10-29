import { HomeAction } from "@/config/helpers/enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  users: any[];
  countries: any[];
  user: any;
  tmp_file: any;
  action: HomeAction | null;
}

const initialState: UserState = {
  users: [],
  countries: [],
  user: {},
  tmp_file: null,
  action: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    get_data(state) {
      state.action = HomeAction.GET_DATA;
    },
    add_country(state, action: PayloadAction<any>) {
      state.countries?.push(action.payload);
    },
    update_profile(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    upgrade_profile(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    upload_image(state, action: PayloadAction<any>) {
      state.tmp_file = action.payload;
    },
    upload_file(state, action: PayloadAction<any>) {
      state.tmp_file = action.payload;
    },
    get_users(state, action: PayloadAction<any[]>) {
      state.users = action.payload;
    },
    home_callback(
      state,
      action: PayloadAction<{
        users?: any[];
        countries?: any[];
        user?: any;
        tmp_file?: any;
        action: HomeAction | null;
      }>
    ) {
      state.users = action.payload.users || [...state.users];
      state.countries = action.payload.countries || [...state.countries];
      state.user = action.payload.user || { ...state.user };
      state.tmp_file = action.payload.tmp_file || { ...state.tmp_file };
      state.action = action.payload.action;
    },
  },
});

export const {
  get_data,
  add_country,
  update_profile,
  upgrade_profile,
  upload_image,
  upload_file,
  get_users,
  home_callback,
} = homeSlice.actions;

export default homeSlice.reducer;
