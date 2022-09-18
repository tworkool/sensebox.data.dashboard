import { fork } from "redux-saga/effects";
import {
  watchFetchSenseboxesData,
  watchFetchSenseboxInfoData,
  watchFetchSenseboxDBMiscData,
  watchFetchSenseboxSensorData,
  watchFetchGeocodingData
} from "./app_state";

function* rootSaga() {
  yield fork(watchFetchSenseboxInfoData);
  yield fork(watchFetchSenseboxesData);
  yield fork(watchFetchSenseboxDBMiscData);
  yield fork(watchFetchSenseboxSensorData);
  yield fork(watchFetchGeocodingData);
}

export default rootSaga;
