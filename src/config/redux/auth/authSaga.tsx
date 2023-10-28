// import { put, takeEvery, call } from "redux-saga/effects";
// import { SagaIterator } from "redux-saga";

// import {
//   loginUserRequest,
//   logoutUserRequest,
//   registerBeeRequest,
//   registerUserRequest,
//   updatePasswordRequest,
// } from "./request";
// import { authAction } from "./reducer";

// function* loginUserSaga(action: any): SagaIterator {
//   try {
//     const res = yield call(loginUserRequest, action.payload);
//     if (!res.data?.login?.token) {
//       yield put(authAction.loginFailure("credentials not found or invalid"));
//     } else {
//       yield put(authAction.loginSuccess(res.data.login.token));
//     }
//   } catch (error) {
//     yield put(authAction.loginFailure(`${error}`));
//   }
// }

// export function* loginSagas(): Generator {
//   yield takeEvery("auth/login", loginUserSaga);
// }
