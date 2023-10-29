import { fork, SimpleEffect } from "redux-saga/effects";
import { homeSagas } from "../redux/home/homeSaga";
import { authSagas } from "../redux/auth/authSaga";

export function* rootSaga(): IterableIterator<SimpleEffect<"FORK">> {
  yield fork(authSagas);
  yield fork(homeSagas);
}
