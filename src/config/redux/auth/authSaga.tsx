import { put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { authMutation } from "./authMutations";
import { AuthAction } from "@/config/helpers/enum";
import { auth_callback } from "./authSlice";

function* loginSaga(action: any): SagaIterator {
  const res = yield call(authMutation.login, action.payload);
  if (res.data?.login?.token) {
    yield put(
      auth_callback({
        token: res.data?.login?.token,
        message: res.error?.message,
        status: res.error?.status,
        action: AuthAction.LOGIN,
      })
    );
  }
}

function* logoutSaga(action: any): SagaIterator {
  const res = yield call(authMutation.logout, action.payload);
  if (res.data?.logout?.token) {
    yield put(
      auth_callback({
        token: null,
        message: res.error?.message,
        status: res.error?.status,
        action: AuthAction.LOGOUT,
      })
    );
  }
}

function* registerSaga(action: any): SagaIterator {
  const res = yield call(authMutation.register, action.payload);
  if (res.data?.register?.token) {
    yield put(
      auth_callback({
        token: res.data?.register?.token,
        message: res.error?.message,
        status: res.error?.status,
        action: AuthAction.REGISTER,
      })
    );
  }
}

function* forgotPasswordSaga(action: any): SagaIterator {
  const res = yield call(authMutation.forgotPassword, action.payload);
  if (res.data?.forgotPassword?.token) {
    yield put(
      auth_callback({
        token: res.data?.forgotPassword?.token,
        message: res.error?.message,
        status: res.error?.status,
        action: AuthAction.FORGOT_PASSWORD,
      })
    );
  }
}

function* resetPasswordSaga(action: any): SagaIterator {
  const res = yield call(authMutation.resetPassword, action.payload);
  if (res.data?.resetPassword?.token) {
    yield put(
      auth_callback({
        token: res.data?.resetPassword?.token,
        message: res.error?.message,
        status: res.error?.status,
        action: AuthAction.RESET_PASSWORD,
      })
    );
  }
}

function* verifyEmailSaga(action: any): SagaIterator {
  const res = yield call(authMutation.verifyEmail, action.payload);
  if (res.data?.verifyEmail?.token) {
    yield put(
      auth_callback({
        token: res.data?.verifyEmail?.token,
        message: res.error?.message,
        status: res.error?.status,
        action: AuthAction.VERIFY_EMAIL,
      })
    );
  }
}

function* loginMultiFactorSaga(action: any): SagaIterator {
  const res = yield call(authMutation.multiFactor, action.payload);
  if (res.data?.loginMultiFactor?.status === 200) {
    const { message, status } = res.data?.loginMultiFactor;
    yield put(
      auth_callback({
        message: message,
        status: status,
        action: AuthAction.LOGIN_MULTI_FACTOR_SUCCESS,
      })
    );
  } else {
    const { message, status } = res.data?.loginMultiFactor;
    yield put(
      auth_callback({
        message: message,
        status: status,
        action: AuthAction.LOGIN_MULTI_FACTOR_FAILED,
      })
    );
  }
}

export function* authSagas(): Generator {
  yield takeEvery("auth/login", loginSaga);
  yield takeEvery("auth/logout", logoutSaga);
  yield takeEvery("auth/register", registerSaga);
  yield takeEvery("auth/forgot_password", forgotPasswordSaga);
  yield takeEvery("auth/reset_password", resetPasswordSaga);
  yield takeEvery("auth/verify_email", verifyEmailSaga);
  yield takeEvery("auth/login_multi_factor", loginMultiFactorSaga);
}
