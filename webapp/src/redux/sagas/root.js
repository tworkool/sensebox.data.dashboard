import { fork, all } from "redux-saga/effects";
import { watchFetchWeatherData } from "./app_state";

function* rootSaga() {
  yield all([fork(watchFetchWeatherData)]);
}

export default rootSaga;
