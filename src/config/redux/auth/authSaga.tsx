import { put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { authMutation } from "./authMutations";
import { AuthAction } from "@/config/helpers/enum";
import { auth_callback } from "./authSlice";
import { emailCheck, passwordCheck, passwordSame } from "./helpers";

function* loginSaga(action: any): SagaIterator {
  const res = yield call(authMutation.login, action.payload);
  const { token, message, status } = res.data?.login || {};
  if (token) {
    yield put(
      auth_callback({
        token: token,
        message: message,
        status: status,
        action: AuthAction.LOGIN_SUCCESS,
      })
    );
  } else {
    yield put(
      auth_callback({
        message: message,
        status: status,
        action: AuthAction.LOGIN_FAILED,
      })
    );
  }
}

function* logoutSaga(action: any): SagaIterator {
  const res = yield call(authMutation.logout);
  const { message, status } = res.data?.logout || {};
  yield put(
    auth_callback({
      message: message,
      status: status,
      action: AuthAction.LOGOUT_SUCCESS,
    })
  );
}

function* registerSaga(action: any): SagaIterator {
  const passwordBothSame = yield call(
    passwordSame,
    action.payload.password,
    action.payload.password_confirmation
  );
  const passwordValid = yield call(passwordCheck, action.payload.password);
  const emailValid = yield call(emailCheck, action.payload.email);

  if (!passwordBothSame) {
    yield put(
      auth_callback({
        message: "Password and password confirmation must be same",
        status: 403,
        action: AuthAction.REGISTER_FAILED,
      })
    );
    return;
  }

  if (!passwordValid) {
    yield put(
      auth_callback({
        message:
          "Password must be at least 8 characters, and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        status: 403,
        action: AuthAction.REGISTER_FAILED,
      })
    );
    return;
  }

  if (!emailValid) {
    yield put(
      auth_callback({
        message: "Email is not valid",
        status: 403,
        action: AuthAction.REGISTER_FAILED,
      })
    );
    return;
  }

  const res = yield call(authMutation.register, action.payload);
  const { token, message, status } = res.data?.register || {};
  if (res.data?.register?.token) {
    yield put(
      auth_callback({
        token,
        message,
        status,
        action: AuthAction.REGISTER_SUCCESS,
      })
    );
  } else {
    yield put(
      auth_callback({
        message,
        status,
        action: AuthAction.REGISTER_FAILED,
      })
    );
  }
}

function* forgotPasswordSaga(action: any): SagaIterator {
  const res = yield call(authMutation.forgotPassword, action.payload);
  const { message, status } = res.data?.forgotPassword || res;
  if (status == 200) {
    yield put(
      auth_callback({
        message: message,
        status: status,
        action: AuthAction.FORGOT_PASSWORD_SUCCESS,
      })
    );
  } else {
    yield put(
      auth_callback({
        message: message,
        status: status,
        action: AuthAction.FORGOT_PASSWORD_FAILED,
      })
    );
  }
}

function* resetPasswordSaga(action: any): SagaIterator {
  const res = yield call(authMutation.resetPassword, action.payload);
  const { message, status } = res.data?.resetPassword || res;
  if (status == 200) {
    yield put(
      auth_callback({
        message: message,
        status: status,
        action: AuthAction.RESET_PASSWORD_SUCCESS,
      })
    );
  } else {
    yield put(
      auth_callback({
        message: message,
        status: status,
        action: AuthAction.RESET_PASSWORD_FAILED,
      })
    );
  }
}

function* verifyEmailSaga(action: any): SagaIterator {
  const res = yield call(authMutation.verifyEmail, action.payload);
  const { message, status } = res.data?.verifyEmail || res;
  if (status == 200) {
    yield put(
      auth_callback({
        message: message,
        status: status,
        action: AuthAction.VERIFY_EMAIL_SUCCESS,
      })
    );
  } else {
    yield put(
      auth_callback({
        message: message,
        status: status,
        action: AuthAction.VERIFY_EMAIL_FAILED,
      })
    );
  }
}

function* loginMultiFactorSaga(action: any): SagaIterator {
  const res = yield call(authMutation.multiFactor, action.payload);
  if (res.data?.loginMultiFactor?.status == 200) {
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

function* updatePasswordSaga(action: any): SagaIterator {
  const passwordBothSame = yield call(
    passwordSame,
    action.payload.new_password,
    action.payload.password_confirmation
  );
  const passwordValid = yield call(passwordCheck, action.payload.password);

  if (!passwordBothSame) {
    yield put(
      auth_callback({
        message: "New Password and password confirmation must be same",
        status: 403,
        action: AuthAction.UPDATE_PASSWORD_FAILED,
      })
    );
    return;
  }

  if (!passwordValid) {
    yield put(
      auth_callback({
        message:
          "Password must be at least 8 characters, and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        status: 403,
        action: AuthAction.UPDATE_PASSWORD_FAILED,
      })
    );
    return;
  }

  const res = yield call(authMutation.updatePassword, action.payload);
  const { message, status } = res.data?.updatePassword || res;
  if (res.data?.updatePassword?.status == 200) {
    yield put(
      auth_callback({
        message: message,
        status: status,
        action: AuthAction.UPDATE_PASSWORD_SUCCESS,
      })
    );
  } else {
    const { message, status } = res.data?.updatePassword;
    yield put(
      auth_callback({
        message: message,
        status: status,
        action: AuthAction.UPDATE_PASSWORD_FAILED,
      })
    );
  }
}

function* sendEmailVerificationSaga(action: any): SagaIterator {
  const res = yield call(authMutation.sendEmailVerify);
  const { message, status } = res.data?.sendEmailVerify || res;
  if (status == 200) {
    yield put(
      auth_callback({
        message: message,
        status: status,
        action: AuthAction.SEND_EMAIL_VERIFICATION_SUCCESS,
      })
    );
  } else {
    const { message, status } = res.data?.sendEmailVerification;
    yield put(
      auth_callback({
        message: message,
        status: status,
        action: AuthAction.SEND_EMAIL_VERIFICATION_FAILED,
      })
    );
  }
}

function* sendMagicLinkSaga(action: any): SagaIterator {
  const res = yield call(authMutation.sendMagicLink, action.payload);
  const { message, status } = res.data?.loginLink || res;
  if (status == 200) {
    yield put(
      auth_callback({
        message: message,
        status: status,
        action: AuthAction.SEND_MAGIC_LINK_SUCCESS,
      })
    );
  } else {
    yield put(
      auth_callback({
        message: message,
        status: status,
        action: AuthAction.SEND_MAGIC_LINK_FAILED,
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
  yield takeEvery("auth/update_password", updatePasswordSaga);
  yield takeEvery("auth/send_email_verification", sendEmailVerificationSaga);
  yield takeEvery("auth/send_magic_link", sendMagicLinkSaga);
}
