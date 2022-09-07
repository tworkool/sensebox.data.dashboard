import { call, put, takeLatest } from "redux-saga/effects";
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
  /* const fakeData = {
    _id: "5bf8373386f11b001aae627e",
    createdAt: "2022-03-30T11:25:43.610Z",
    updatedAt: "2022-09-03T23:29:44.818Z",
    name: "Tworkool",
    currentLocation: {
      type: "Point",
      coordinates: [13.628301, 52.45608],
      timestamp: "2022-08-07T19:37:57.432Z",
    },
    exposure: "indoor",
    sensors: [
      {
        title: "Temperatur",
        unit: "°C",
        sensorType: "HDC1080",
        icon: "osem-thermometer",
        _id: "5bf8373386f11b001aae6285",
        lastMeasurement: {
          value: "21.88",
          createdAt: "2022-09-03T23:29:44.813Z",
        },
      },
      {
        title: "rel. Luftfeuchte",
        unit: "%",
        sensorType: "HDC1080",
        icon: "osem-humidity",
        _id: "5bf8373386f11b001aae6284",
        lastMeasurement: {
          value: "59.02",
          createdAt: "2022-09-03T23:29:44.813Z",
        },
      },
      {
        title: "Luftdruck",
        unit: "hPa",
        sensorType: "BMP280",
        icon: "osem-barometer",
        _id: "5bf8373386f11b001aae6283",
        lastMeasurement: {
          value: "1014.29",
          createdAt: "2022-09-03T23:29:44.813Z",
        },
      },
      {
        title: "Beleuchtungsstärke",
        unit: "lx",
        sensorType: "TSL45315",
        icon: "osem-brightness",
        _id: "5bf8373386f11b001aae6282",
        lastMeasurement: {
          value: "8.00",
          createdAt: "2022-09-03T23:29:44.813Z",
        },
      },
      {
        title: "UV-Intensität",
        unit: "μW/cm²",
        sensorType: "VEML6070",
        icon: "osem-brightness",
        _id: "5bf8373386f11b001aae6281",
        lastMeasurement: {
          value: "0.00",
          createdAt: "2022-09-03T23:29:44.813Z",
        },
      },
      {
        title: "PM10",
        unit: "µg/m³",
        sensorType: "SDS 011",
        icon: "osem-cloud",
        _id: "5bf8373386f11b001aae6280",
        lastMeasurement: {
          value: "11.40",
          createdAt: "2022-09-03T23:29:44.813Z",
        },
      },
      {
        title: "PM2.5",
        unit: "µg/m³",
        sensorType: "SDS 011",
        icon: "osem-cloud",
        _id: "5bf8373386f11b001aae627f",
        lastMeasurement: {
          value: "10.80",
          createdAt: "2022-09-03T23:29:44.813Z",
        },
      },
    ],
    model: "homeV2WifiFeinstaub",
    lastMeasurementAt: "2022-09-03T23:29:44.813Z",
    description:
      "Software for displaying Sensebox data linked below. (It's an amateur project, also it is unofficial)",
    image: "5bf8373386f11b001aae627e_q3si5q.jpg",
    weblink: "https://github.com/tworkool/SenseBox-Visualizer",
    grouptag: [],
    loc: [
      {
        geometry: {
          type: "Point",
          coordinates: [13.628301, 52.45608],
          timestamp: "2022-08-07T19:37:57.432Z",
        },
        type: "Feature",
      },
    ],
  };
  yield put(
    succeedSenseboxInfoDataFetch({
      senseboxInfoData: {
        data: fakeData,
        isLoading: false,
        validBoxId: fakeData._id,
      },
    })
  );
  return; */
  try {
    const response = yield call(BACKEND.fetchSenseboxInfo, action.payload.id);
    console.log(response);
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
      showNotification({
        id: "fetch_sensebox_db_misc_data_notification",
        title: "FETCH SUCCESS",
        message: "FETCH SUCCESS",
        color: "green",
      });
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
