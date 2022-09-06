import { fork } from "redux-saga/effects";
import {
  watchFetchSenseboxesData,
  watchFetchSenseboxInfoData,
  watchFetchSenseboxDBMiscData,
} from "./app_state";

function* rootSaga() {
  yield fork(watchFetchSenseboxInfoData);
  yield fork(watchFetchSenseboxesData);
  yield fork(watchFetchSenseboxDBMiscData);
}

export default rootSaga;
