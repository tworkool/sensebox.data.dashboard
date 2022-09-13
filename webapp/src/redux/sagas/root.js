import { fork } from "redux-saga/effects";
import {
  watchFetchSenseboxesData,
  watchFetchSenseboxInfoData,
  watchFetchSenseboxDBMiscData,
  watchFetchSenseboxSensorData,
} from "./app_state";

function* rootSaga() {
  yield fork(watchFetchSenseboxInfoData);
  yield fork(watchFetchSenseboxesData);
  yield fork(watchFetchSenseboxDBMiscData);
  yield fork(watchFetchSenseboxSensorData);
}

export default rootSaga;
