import { HomeAction } from "@/config/helpers/enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  users: any[];
  countries: any[];
  user: any;
  action: HomeAction | null;
  message?: string;
  image_link?: string;
  profile?: any;
}

const initialState: UserState = {
  users: [],
  countries: [],
  user: {},
  action: null,
  message: "",
  image_link: "",
  profile: {},
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    home_reset_actions(state) {
      state.action = null;
    },
    get_data(state) {
      state.action = HomeAction.GET_DATA;
    },
    get_countries(state) {
      state.action = HomeAction.GET_COUNTRIES;
    },
    add_country(state, action: PayloadAction<any>) {
      state.countries?.push(action.payload);
    },
    update_profile(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.action = HomeAction.UPDATE_PROFILE;
    },
    upgrade_profile(state, action: PayloadAction<any>) {
      state.action = HomeAction.UPGRADE_PROFILE;
    },
    upload_image(state, action: PayloadAction<any>) {
      state.action = HomeAction.UPLOAD_IMAGE;
    },
    get_users(state) {
      state.action = HomeAction.GET_USERS;
    },
    get_profile(state, action: PayloadAction<any>) {
      state.profile = state.users?.find((user) => user.id === action.payload);
    },
    update_document(state, action: PayloadAction<any>) {
      state.action = HomeAction.POST_DOCUMENT;
    },
    home_callback(
      state,
      action: PayloadAction<{
        users?: any[];
        countries?: any[];
        user?: any;
        action: HomeAction | null;
        message?: string;
        image_link?: string;
      }>
    ) {
      state.users = action.payload.users || [...state.users];
      state.countries = action.payload.countries || [...state.countries];
      state.user = action.payload.user || { ...state.user };
      state.action = action.payload.action;
      state.message = action.payload.message || "";
      state.image_link = action.payload.image_link || state.image_link;
    },
  },
});

export const {
  get_data,
  add_country,
  update_profile,
  upgrade_profile,
  upload_image,
  get_users,
  home_callback,
  home_reset_actions,
  update_document,
  get_profile,
  get_countries,
} = homeSlice.actions;

export default homeSlice.reducer;
