import { fork } from "redux-saga/effects";
import {
  watchFetchSenseboxesData,
  watchFetchSenseboxInfoData,
  watchFetchSenseboxDBMiscData,
  watchFetchSenseboxSensorData,
  watchFetchGeocodingData,
  watchFetchSenseboxSensorLatestMeasurementsData,
} from "./app_state";

function* rootSaga() {
  yield fork(watchFetchSenseboxInfoData);
  yield fork(watchFetchSenseboxesData);
  yield fork(watchFetchSenseboxDBMiscData);
  yield fork(watchFetchSenseboxSensorData);
  yield fork(watchFetchGeocodingData);
  yield fork(watchFetchSenseboxSensorLatestMeasurementsData);
}

export default rootSaga;
