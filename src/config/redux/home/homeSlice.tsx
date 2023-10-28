import { HomeAction } from "@/config/helpers/enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UserState {
  users: any[];
  countries: any[];
  user: any;
  tmp_file: any;
  action : HomeAction | null;
}

const initialState: UserState = {
  users: [],
  countries: [],
  user: {},
  tmp_file: null,
  action: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getData(state, action: PayloadAction<any[]>) {
      state.users = action.payload;
    },
    add_country(state, action: PayloadAction<any>) {
      state.countries.push(action.payload);
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
  },
});

export const {
  getData,
  add_country,
  update_profile,
  upgrade_profile,
  upload_image,
  upload_file,
  get_users,
} = userSlice.actions;

export default userSlice.reducer;
