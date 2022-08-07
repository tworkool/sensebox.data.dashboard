import { call, put, takeLatest } from "redux-saga/effects";
import {
  failWeatherDataFetch,
  succeedWeatherDataFetch,
} from "../actions/app_state";
import { WEATHER_DATA_FETCH_REQUESTED } from "../action_types/app_state";
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

function* watchFetchWeatherData() {
  yield takeLatest(WEATHER_DATA_FETCH_REQUESTED, fetchWeatherData);
}

export { watchFetchWeatherData };
