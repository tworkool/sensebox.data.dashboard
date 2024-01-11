import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  succeedSenseboxesDataFetch,
  failSenseboxesDataFetch,
  succeedSenseboxInfoDataFetch,
  failSenseboxInfoDataFetch,
  succeedSenseboxDBMiscDataFetch,
  failSenseboxDBMiscDataFetch,
  succeedSenseboxSensorDataFetch,
  failSenseboxSensorDataFetch,
  succeedGeocodingDataFetch,
  failGeocodingDataFetch,
  succeedSunApiDataFetch,
  failSunApiDataFetch,
} from "../actions/app_state";
import {
  GEOCODING_FETCH_REQUESTED,
  SENSEBOXES_FETCH_REQUESTED,
  SENSEBOX_DB_MISC_FETCH_REQUESTED,
  SENSEBOX_INFO_FETCH_REQUESTED,
  SENSEBOX_SENSOR_FETCH_REQUESTED,
} from "../action_types/app_state";
import BACKEND from "./api/backend";
import { showNotification } from "@mantine/notifications";
import QUERY_DATA_MODIFIERS from "./api/query_data_modifiers";
import { getSenseboxInfoData } from "../selectors/appState";
import { getLocalTime } from "../../utils/helpers";
import CONSTANTS from "../../utils/constants";

// TODO: implement generic resolution generator function for sagas
/* function* completeSagaAction(success, action, actionValue) {
  yield put(action({ ...actionValue }));

  showNotification({
    id: `${Object.keys({ [action]: false })[0]}_Notification_${moment().utc()}`,
    title: success ? "FETCH SUCCESS" : "FETCH ERROR",
    message: success ? "FETCH SUCCESS" : "FETCH ERROR",
    color: success ? "green" : "red",
  });
} */

// TODO: is this needed?
/* function* fetchWeatherData(action) {
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
} */

function buildSagaFailNotificationConfig(id_part, message) {
  return {
    id: `fetch_${id_part}_notification${Date.now()}`,
    title: "Fetch failed!",
    message: message,
    color: "red",
  };
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
    const notificationConfig = buildSagaFailNotificationConfig(
      "senseboxes_data",
      "Could not fetch Senseboxes"
    );
    showNotification(notificationConfig);
  }
}

function* fetchSenseboxInfoData(action) {
  try {
    if (!action?.payload?.id) {
      const previousData = yield select(getSenseboxInfoData);
      const lastValidSenseboxID = previousData?.["validBoxId"];
      if (!lastValidSenseboxID) {
        throw new Error(
          "Could not find fallback value for last valid Sensebox ID"
        );
      }
      action.payload.id = lastValidSenseboxID;
    }
    const response = yield call(BACKEND.fetchSenseboxInfo, action.payload.id);
    if (response.status >= 200 && response.status < 300) {
      const rawData = yield response.json();
      const sensorFilters =
        QUERY_DATA_MODIFIERS.aggregateFilterOptionsFromSensors(rawData);
      const sensorData = QUERY_DATA_MODIFIERS.aggregateExtraSensorInfo(
        rawData.sensors
      );

      yield put(
        succeedSenseboxInfoDataFetch({
          senseboxInfoData: {
            data: rawData,
            isLoading: false,
            validBoxId: action.payload.id,
          },
          senseboxSensorData: {
            data: sensorData.sensors,
            extraData: {
              sensorFilters,
              dispatchInterval: sensorData.dispatchInterval,
            },
          },
        })
      );

      localStorage.setItem(CONSTANTS.LAST_SENSEBOX_ID, action?.payload?.id);

      const coordinates = rawData?.currentLocation?.coordinates;
      if (coordinates) {
        const [lon, lat] = coordinates;
        // fetch Sun API data with correct timezone
        yield fetchSunApiData({ payload: { lat, lon } });
      }
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
        senseboxSensorData: undefined,
      })
    );

    const notificationConfig = buildSagaFailNotificationConfig(
      "senseboxinfo_data",
      "Could not fetch info for Sensebox"
    );
    showNotification(notificationConfig);
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
    } else {
      throw response;
    }
  } catch (e) {
    yield put(
      failSenseboxDBMiscDataFetch({
        senseboxDBMiscData: { data: undefined },
      })
    );

    const notificationConfig = buildSagaFailNotificationConfig(
      "sensebox_db_misc_data",
      "Could not fetch general Sensebox data overview"
    );
    showNotification(notificationConfig);
  }
}

function* fetchSenseboxSensorData(action) {
  try {
    if (!action?.payload?.senseboxID) {
      const previousSenseboxData = yield select(getSenseboxInfoData);
      const lastValidSenseboxID = previousSenseboxData?.["validBoxId"];
      if (!lastValidSenseboxID) {
        throw new Error(
          "Could not find fallback value for last valid Sensebox ID"
        );
      }
      action.payload.senseboxID = lastValidSenseboxID;
    }

    const response = yield call(
      BACKEND.fetchSenseboxSensorData,
      action.payload.senseboxID
    );

    if (response.status >= 200 && response.status < 300) {
      const rawData = yield response.json();
      const sensorFilters =
        QUERY_DATA_MODIFIERS.aggregateFilterOptionsFromSensors(rawData);
      const sensorData = QUERY_DATA_MODIFIERS.aggregateExtraSensorInfo(
        rawData.sensors
      );

      yield put(
        succeedSenseboxSensorDataFetch({
          senseboxSensorData: {
            data: sensorData.sensors,
            extraData: {
              sensorFilters,
              dispatchInterval: sensorData.dispatchInterval,
            },
          },
        })
      );
    } else {
      throw response;
    }
  } catch (e) {
    yield put(
      failSenseboxSensorDataFetch({
        senseboxSensorData: undefined,
      })
    );

    const notificationConfig = buildSagaFailNotificationConfig(
      "sensebox_sensor_data",
      `Could not fetch sensor data for Sensebox (ID: ${action.payload.senseboxID ?? "NO_ID"
      })`
    );
    showNotification(notificationConfig);
  }
}

function* fetchGeocodingData(action) {
  try {
    const response = yield call(
      BACKEND.fetchGeocodingData,
      action.payload.lat,
      action.payload.lon
    );

    if (response.status >= 200 && response.status < 300) {
      const rawData = yield response.json();
      const data = QUERY_DATA_MODIFIERS.aggregateGeocodingLocationData(rawData);

      yield put(
        succeedGeocodingDataFetch({
          geocodingData: {
            data: data,
          },
        })
      );
    } else {
      throw response;
    }
  } catch (e) {
    yield put(
      failGeocodingDataFetch({
        geocodingData: undefined,
      })
    );

    const notificationConfig = buildSagaFailNotificationConfig(
      "geocoding_data",
      "Could not fetch detailed geocoding location"
    );
    showNotification(notificationConfig);
  }
}

function* fetchSunApiData(action) {
  // TODO: ATTRIBUTION!
  // TODO: MESZ TIMEZONE AUSGLEICH
  try {
    const boxData = yield select(getSenseboxInfoData);
    const currentLocation = boxData?.data?.currentLocation;
    const coordinates = currentLocation?.coordinates;

    if (!action.payload?.lat || !action.payload?.lon) {
      action.payload.lat = coordinates[1];
      action.payload.lon = coordinates[0];
    }

    let localDate = getLocalTime(new Date(), coordinates);

    const response = yield call(
      BACKEND.fetchSunApiData,
      action.payload.lat,
      action.payload.lon,
      localDate
    );

    if (response.status >= 200 && response.status < 300) {
      const rawData = yield response.json();

      if (!rawData?.results) throw new Error("Invalid Sun API Results");

      yield put(
        succeedSunApiDataFetch({
          sunApiData: {
            data: { ...rawData.results, utcOffset: localDate.utcOffset() },
          },
        })
      );
    } else {
      throw response;
    }
  } catch (e) {
    yield put(
      failSunApiDataFetch({
        sunApiData: { data: undefined },
      })
    );

    const notificationConfig = buildSagaFailNotificationConfig(
      "sunApiData_data",
      "Could not fetch sunset/sunrise widget information"
    );
    showNotification(notificationConfig);
  }
}

/* function* watchFetchWeatherData() {
  yield takeLatest(WEATHER_DATA_FETCH_REQUESTED, fetchWeatherData);
} */

function* watchFetchSenseboxesData() {
  yield takeLatest(SENSEBOXES_FETCH_REQUESTED, fetchSenseboxesData);
}

function* watchFetchSenseboxInfoData() {
  yield takeLatest(SENSEBOX_INFO_FETCH_REQUESTED, fetchSenseboxInfoData);
}

function* watchFetchSenseboxDBMiscData() {
  yield takeLatest(SENSEBOX_DB_MISC_FETCH_REQUESTED, fetchSenseboxDBMiscData);
}

function* watchFetchSenseboxSensorData() {
  yield takeLatest(SENSEBOX_SENSOR_FETCH_REQUESTED, fetchSenseboxSensorData);
}

function* watchFetchGeocodingData() {
  yield takeLatest(GEOCODING_FETCH_REQUESTED, fetchGeocodingData);
}

export {
  watchFetchSenseboxesData,
  watchFetchSenseboxInfoData,
  watchFetchSenseboxDBMiscData,
  watchFetchSenseboxSensorData,
  watchFetchGeocodingData,
};
