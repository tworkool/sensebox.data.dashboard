import { call, put, takeLatest } from "redux-saga/effects";
import {
  failWeatherDataFetch,
  succeedSenseboxesDataFetch,
  failSenseboxesDataFetch,
  succeedWeatherDataFetch,
  succeedSenseboxInfoDataFetch,
  failSenseboxInfoDataFetch,
} from "../actions/app_state";
import {
  SENSEBOXES_FETCH_REQUESTED,
  SENSEBOX_INFO_FETCH_REQUESTED,
  WEATHER_DATA_FETCH_REQUESTED,
} from "../action_types/app_state";
import BACKEND from "./api/backend";
import { showNotification, updateNotification } from "@mantine/notifications";

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
      const data = yield response.json();

      yield put(
        succeedSenseboxesDataFetch({
          senseboxesData: { data: data, isLoading: false },
        })
      );
      showNotification({
        id: "fetch_senseboxes_data_notification",
        title: "FETCH SUCCESS",
        message: "FETCH SUCCESS",
        color: "green",
      });
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
  console.log(action);
  try {
    const response = yield call(BACKEND.fetchSenseboxInfo, action.payload.id);
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      const data = yield response.json();

      yield put(
        succeedSenseboxInfoDataFetch({
          senseboxInfoData: {
            id: new Date().toUTCString(),
            data: data,
            isLoading: false,
            validBoxId: action.payload.id,
          },
        })
      );
      showNotification({
        id: "fetch_senseboxinfo_data_notification",
        title: "FETCH SUCCESS",
        message: "FETCH SUCCESS",
        color: "green",
      });
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

function* watchFetchWeatherData() {
  yield takeLatest(WEATHER_DATA_FETCH_REQUESTED, fetchWeatherData);
}

function* watchFetchSenseboxesData() {
  yield takeLatest(SENSEBOXES_FETCH_REQUESTED, fetchSenseboxesData);
}

function* watchFetchSenseboxInfoData() {
  yield takeLatest(SENSEBOX_INFO_FETCH_REQUESTED, fetchSenseboxInfoData);
}

export {
  watchFetchWeatherData,
  watchFetchSenseboxesData,
  watchFetchSenseboxInfoData,
};
