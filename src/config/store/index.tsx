import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./saga";

import { rootReducer } from "./reducer";

import { ThunkAction, Action } from "@reduxjs/toolkit";

import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

//hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;