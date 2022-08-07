import { configureStore } from "@reduxjs/toolkit";
import { rootInit, rootReducer } from "./reducers/root";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/root";
import ENVIRONMENT from "../utils/env";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  devTools: ENVIRONMENT.ENV !== "production",
  preloadedState: rootInit,
});

sagaMiddleware.run(rootSaga);

export default store;
