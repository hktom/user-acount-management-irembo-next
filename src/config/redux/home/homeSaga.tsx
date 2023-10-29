import { SagaIterator } from "redux-saga";
import { homeMutation } from "./homeMutations";
import { call, put, takeEvery } from "redux-saga/effects";
import { HomeAction } from "@/config/helpers/enum";
import { home_callback } from "./homeSlice";
import { homeQuery } from "./homeQueries";

function* getMeSaga(): SagaIterator {
  const res = yield call(homeQuery.me);
  if (res.data?.me) {
    yield put(
      home_callback({
        user: res.data?.me,
        action: HomeAction.GET_ME_SUCCESS,
      })
    );
  } else {
    console.log(res);
    yield put(
      home_callback({
        action: HomeAction.GET_ME_FAILED,
      })
    );
  }
}

function* getCountriesSaga(): SagaIterator {
  const res = yield call(homeQuery.countries);
  if (res.data?.countries) {
    yield put(
      home_callback({
        countries: res.data?.countries,
        action: HomeAction.GET_COUNTRIES_SUCCESS,
      })
    );
  } else {
    yield put(
      home_callback({
        action: HomeAction.GET_COUNTRIES_FAILED,
      })
    );
  }
}

function* getUsersSaga(): SagaIterator {
  const res = yield call(homeQuery.users);
  if (res.data?.users) {
    yield put(
      home_callback({
        users: res.data?.users,
        action: HomeAction.GET_USERS_SUCCESS,
      })
    );
  } else {
    yield put(
      home_callback({
        action: HomeAction.GET_USERS_FAILED,
      })
    );
  }
}

function* updateProfileSaga(action: any): SagaIterator {
  const res = yield call(homeMutation.updateProfile, action.payload);
  if (res.data?.updateProfile?.user) {
    yield put(
      home_callback({
        user: res.data?.updateProfile?.user,
        action: HomeAction.UPDATE_PROFILE_SUCCESS,
      })
    );
  } else {
    yield put(
      home_callback({
        action: HomeAction.UPDATE_PROFILE_FAILED,
      })
    );
  }
}

function* postDocumentSaga(action: any): SagaIterator {
  const res = yield call(homeMutation.postDocument, action.payload);
  if (res.data?.postDocument?.document) {
    yield put(
      home_callback({
        user: res.data?.postDocument?.document,
        action: HomeAction.POST_DOCUMENT_SUCCESS,
      })
    );
  } else {
    yield put(
      home_callback({
        action: HomeAction.POST_DOCUMENT_FAILED,
      })
    );
  }
}

function* confirmDocumentSaga(action: any): SagaIterator {
  const res = yield call(
    homeMutation.confirmDocument,
    action.payload.user_id,
    action.payload.status
  );
  if (res.data?.confirmDocument?.status) {
    yield put(
      home_callback({
        action: HomeAction.CONFIRM_DOCUMENT_SUCCESS,
      })
    );
  } else {
    yield put(
      home_callback({
        action: HomeAction.CONFIRM_DOCUMENT_FAILED,
      })
    );
  }
}

export function* homeSagas(): Generator {
  yield takeEvery("home/get_data", getMeSaga);
  yield takeEvery("home/get_countries", getCountriesSaga);
  yield takeEvery("home/get_users", getUsersSaga);
  yield takeEvery("home/update_profile", updateProfileSaga);
  yield takeEvery("home/post_document", postDocumentSaga);
  yield takeEvery("home/confirm_document", confirmDocumentSaga);
}
