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
  const { users } = res.data || res;
  if (users) {
    yield put(
      home_callback({
        users: users,
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
  const { user, message, status } = res.data?.updateProfile || {};
  if (status == 200) {
    yield put(
      home_callback({
        user: user,
        action: HomeAction.UPDATE_PROFILE_SUCCESS,
        message: message,
      })
    );
  } else {
    yield put(
      home_callback({
        action: HomeAction.UPDATE_PROFILE_FAILED,
        message: message,
      })
    );
  }
}

function* postDocumentSaga(action: any): SagaIterator {
  if (!action.payload.name || !action.payload.code || !action.payload.photo) {
    yield put(
      home_callback({
        message: "Please fill all the form",
        action: HomeAction.POST_DOCUMENT_FAILED,
      })
    );
    return;
  }
  const res = yield call(homeMutation.postDocument, action.payload);
  const { error, message, status, user } = res.data?.postDocument || res;
  console.log(error);
  if (status == 200) {
    yield put(
      home_callback({
        message: message,
        action: HomeAction.POST_DOCUMENT_SUCCESS,
        user: user,
      })
    );
  } else {
    yield put(
      home_callback({
        message: message,
        action: HomeAction.POST_DOCUMENT_FAILED,
      })
    );
  }
}

// function* confirmDocumentSaga(action: any): SagaIterator {
//   const res = yield call(
//     homeMutation.confirmDocument,
//     action.payload.user_id,
//     action.payload.status
//   );
//   if (res.data?.confirmDocument?.status) {
//     yield put(
//       home_callback({
//         action: HomeAction.CONFIRM_DOCUMENT_SUCCESS,
//       })
//     );
//   } else {
//     yield put(
//       home_callback({
//         action: HomeAction.CONFIRM_DOCUMENT_FAILED,
//       })
//     );
//   }
// }

function* uploadImageSaga(action: any): SagaIterator {
  const res = yield call(homeMutation.uploadImage, action.payload);
  if (res.data) {
    yield put(
      home_callback({
        action: HomeAction.UPLOAD_IMAGE_SUCCESS,
        image_link: res.data,
      })
    );
  } else {
    yield put(
      home_callback({
        message:
          "We can't upload your image. Be sure your image extension is jpeg,png,jpg,webp and the size is less than 1MB",
        action: HomeAction.UPLOAD_IMAGE_FAILED,
      })
    );
  }
}

function* upgradeProfileSaga(action: any): SagaIterator {

  const res = yield call(homeMutation.confirmDocument, action.payload);
  const { message, status } = res.data?.confirmDocument || res;
  if (status == 200) {
    yield put(
      home_callback({
        message: message,
        action: HomeAction.UPGRADE_PROFILE_SUCCESS,
      })
    );
  } else {
    yield put(
      home_callback({
        message: message,
        action: HomeAction.UPGRADE_PROFILE_FAILED,
      })
    );
  }
}

export function* homeSagas(): Generator {
  yield takeEvery("home/get_data", getMeSaga);
  yield takeEvery("home/get_countries", getCountriesSaga);
  yield takeEvery("home/get_users", getUsersSaga);
  yield takeEvery("home/update_profile", updateProfileSaga);
  yield takeEvery("home/update_document", postDocumentSaga);
  yield takeEvery("home/upload_image", uploadImageSaga);
  yield takeEvery("home/upgrade_profile", upgradeProfileSaga);
  yield takeEvery("home/get_countries", getCountriesSaga);

}
