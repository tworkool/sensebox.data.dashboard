import { fork } from "redux-saga/effects";
import {
  watchFetchSenseboxesData,
  watchFetchSenseboxInfoData,
} from "./app_state";

function* rootSaga() {
  yield fork(watchFetchSenseboxInfoData);
  yield fork(watchFetchSenseboxesData);
}

export default rootSaga;
