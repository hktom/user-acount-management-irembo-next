export enum AuthAction {
  LOGIN = "LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILED = "LOGIN_FAILED",
  LOGOUT = "LOGOUT",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_FAILED = "LOGOUT_FAILED",
  REGISTER = "REGISTER",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAILED = "REGISTER_FAILED",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
  FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED",
  RESET_PASSWORD = "RESET_PASSWORD",
  RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED",
  VERIFY_EMAIL = "VERIFY_EMAIL",
  VERIFY_EMAIL_SUCCESS = "VERIFY_EMAIL_SUCCESS",
  VERIFY_EMAIL_FAILED = "VERIFY_EMAIL_FAILED",
  LOGIN_MULTI_FACTOR = "LOGIN_MULTI_FACTOR",
  LOGIN_MULTI_FACTOR_SUCCESS = "LOGIN_MULTI_FACTOR_SUCCESS",
  LOGIN_MULTI_FACTOR_FAILED = "LOGIN_MULTI_FACTOR_FAILED",
  LOADING = "LOADING",
}

export enum HomeAction {
  GET_DATA = "GET_DATA",
  GET_DATA_SUCCESS = "GET_DATA_SUCCESS",
  GET_DATA_FAILED = "GET_DATA_FAILED",
  ADD_COUNTRY = "ADD_COUNTRY",
  ADD_COUNTRY_SUCCESS = "ADD_COUNTRY_SUCCESS",
  ADD_COUNTRY_FAILED = "ADD_COUNTRY_FAILED",
  UPDATE_PROFILE = "UPDATE_PROFILE",
  UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_FAILED = "UPDATE_PROFILE_FAILED",
  UPGRADE_PROFILE = "UPGRADE_PROFILE",
  UPGRADE_PROFILE_SUCCESS = "UPGRADE_PROFILE_SUCCESS",
  UPGRADE_PROFILE_FAILED = "UPGRADE_PROFILE_FAILED",
  UPLOAD_IMAGE = "UPLOAD_IMAGE",
  UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS",
  UPLOAD_IMAGE_FAILED = "UPLOAD_IMAGE_FAILED",
  UPLOAD_FILE = "UPLOAD_FILE",
  UPLOAD_FILE_SUCCESS = "UPLOAD_FILE_SUCCESS",
  UPLOAD_FILE_FAILED = "UPLOAD_FILE_FAILED",
  GET_USERS = "GET_USERS",
  GET_USERS_SUCCESS = "GET_USERS_SUCCESS",
  GET_USERS_FAILED = "GET_USERS_FAILED",
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum MARITAL_STATUS {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
}

export enum Gender {
  MAN = "MAN",
  WOMAN = "WOMAN",
  OTHER = "OTHER",
}

enum Status {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
}