import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  failWeatherDataFetch,
  succeedSenseboxesDataFetch,
  failSenseboxesDataFetch,
  succeedWeatherDataFetch,
  succeedSenseboxInfoDataFetch,
  failSenseboxInfoDataFetch,
  succeedSenseboxDBMiscDataFetch,
  failSenseboxDBMiscDataFetch,
} from "../actions/app_state";
import {
  SENSEBOXES_FETCH_REQUESTED,
  SENSEBOX_DB_MISC_FETCH_REQUESTED,
  SENSEBOX_INFO_FETCH_REQUESTED,
  WEATHER_DATA_FETCH_REQUESTED,
} from "../action_types/app_state";
import BACKEND from "./api/backend";
import { showNotification, updateNotification } from "@mantine/notifications";
import moment from "moment";
import QUERY_DATA_MODIFIERS from "./api/query_data_modifiers";
import { getSenseboxInfoData } from "../selectors/appState";

function* completeSagaAction(success, action, actionValue) {
  yield put(action({ ...actionValue }));

  showNotification({
    id: `${Object.keys({ [action]: false })[0]}_Notification_${moment().utc()}`,
    title: success ? "FETCH SUCCESS" : "FETCH ERROR",
    message: success ? "FETCH SUCCESS" : "FETCH ERROR",
    color: success ? "green" : "red",
  });
}

function* fetchWeatherData(action) {
  showNotification({
    id: "fetch_weather_data_notification",
    title: "Loading Data",
    message: "Loading Data",
    loading: true,
  });
  try {
    const response = yield call(
      BACKEND.sample_fetch,
      action.payload.lat,
      action.payload.lon
    );
    if (response.status >= 200 && response.status < 300) {
      const data = yield response.json();

      yield put(succeedWeatherDataFetch({ weatherData: data }));
      updateNotification({
        id: "fetch_weather_data_notification",
        title: "FETCH SUCCESS",
        message: "FETCH SUCCESS",
        color: "green",
      });
    } else {
      throw response;
    }
  } catch (e) {
    yield put(failWeatherDataFetch({ weatherData: {} }));
    updateNotification({
      id: "fetch_weather_data_notification",
      title: "FETCH FAIL",
      message: "Could not fetch weather data",
      color: "red",
    });
  }
}

function* fetchSenseboxesData(action) {
  try {
    const response = yield call(
      BACKEND.fetchSenseboxesByName,
      action.payload.name
    );
    if (response.status >= 200 && response.status < 300) {
      const rawData = yield response.json();
      const data = QUERY_DATA_MODIFIERS.limitArrayFromStart(rawData);

      yield put(
        succeedSenseboxesDataFetch({
          senseboxesData: { data: data, isLoading: false },
        })
      );
    } else {
      throw response;
    }
  } catch (e) {
    yield put(
      failSenseboxesDataFetch({
        senseboxesData: { data: undefined, isLoading: false },
      })
    );
    showNotification({
      id: "fetch_senseboxes_data_notification",
      title: "FETCH FAIL",
      message: "Could not fetch weather data",
      color: "red",
    });
  }
}

function* fetchSenseboxInfoData(action) {
  try {
    if (!action?.payload?.id) {
      const previousData = yield select(getSenseboxInfoData);
      console.log(previousData);
      const lastValidSenseboxID = previousData?.["validBoxId"];
      console.log(lastValidSenseboxID);
      if (!lastValidSenseboxID) {
        throw new Error(
          "Could not find fallback value for last valid Sensebox ID"
        );
      }
      action.payload.id = lastValidSenseboxID;
    }
    const response = yield call(BACKEND.fetchSenseboxInfo, action.payload.id);
    if (response.status >= 200 && response.status < 300) {
      const data = yield response.json();
      const sensorFilters = data.sensors?.reduce((p, i) => {
        const classifier = i.unit;
        const sensorInstance = { _id: i._id, title: i.title };
        if (Object.keys(p).includes(classifier)) {
          // EDIT filter
          const newItem = { ...p };
          newItem[classifier].totalAmount += 1;
          newItem[classifier].sensors.push(sensorInstance);
          return newItem;
        } else {
          // ADD new filter
          return {
            ...p,
            [classifier]: {
              classifier,
              totalAmount: 1,
              sensors: [sensorInstance],
            },
          };
        }
      }, {});

      yield put(
        succeedSenseboxInfoDataFetch({
          senseboxInfoData: {
            data: data,
            extraData: {
              sensorFilters,
            },
            isLoading: false,
            validBoxId: action.payload.id,
          },
        })
      );
    } else {
      throw response;
    }
  } catch (e) {
    yield put(
      failSenseboxInfoDataFetch({
        senseboxInfoData: {
          data: undefined,
          isLoading: false,
        },
      })
    );
    showNotification({
      id: "fetch_senseboxinfo_data_notification",
      title: "FETCH FAIL",
      message: "Could not fetch weather data",
      color: "red",
    });
  }
}

function* fetchSenseboxDBMiscData(action) {
  try {
    const response = yield call(BACKEND.fetchSenseboxDBMiscData);
    if (response.status >= 200 && response.status < 300) {
      const rawData = yield response.json();
      const data = {
        registeredBoxes: rawData[0],
        measurementsTotal: rawData[1],
        measurementsPastHour: rawData[2],
      };

      yield put(
        succeedSenseboxDBMiscDataFetch({
          senseboxDBMiscData: { data: data },
        })
      );
      /* completeSagaAction(true, succeedSenseboxDBMiscDataFetch, {
        senseboxDBMiscData: { data: data },
      }); */
    } else {
      throw response;
    }
  } catch (e) {
    yield put(
      failSenseboxDBMiscDataFetch({
        senseboxDBMiscData: { data: undefined },
      })
    );
    showNotification({
      id: "fetch_sensebox_db_misc_data_notification",
      title: "FETCH FAIL",
      message: "Could not fetch weather data",
      color: "red",
    });
  }
}

function* watchFetchWeatherData() {
  yield takeLatest(WEATHER_DATA_FETCH_REQUESTED, fetchWeatherData);
}

function* watchFetchSenseboxesData() {
  yield takeLatest(SENSEBOXES_FETCH_REQUESTED, fetchSenseboxesData);
}

function* watchFetchSenseboxInfoData() {
  yield takeLatest(SENSEBOX_INFO_FETCH_REQUESTED, fetchSenseboxInfoData);
}

function* watchFetchSenseboxDBMiscData() {
  yield takeLatest(SENSEBOX_DB_MISC_FETCH_REQUESTED, fetchSenseboxDBMiscData);
}

export {
  watchFetchWeatherData,
  watchFetchSenseboxesData,
  watchFetchSenseboxInfoData,
  watchFetchSenseboxDBMiscData,
};
