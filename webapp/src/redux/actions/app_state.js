import {
  WEATHER_DATA_FETCH_FAILED,
  WEATHER_DATA_FETCH_REQUESTED,
  WEATHER_DATA_FETCH_SUCCEEDED,
  
  SENSEBOXES_FETCH_REQUESTED,
  SENSEBOXES_FETCH_FAILED,
  SENSEBOXES_FETCH_SUCCEEDED,

  SENSEBOX_INFO_FETCH_REQUESTED,
  SENSEBOX_INFO_FETCH_FAILED,
  SENSEBOX_INFO_FETCH_SUCCEEDED,

  SENSEBOX_DB_MISC_FETCH_REQUESTED,
  SENSEBOX_DB_MISC_FETCH_FAILED,
  SENSEBOX_DB_MISC_FETCH_SUCCEEDED,

  SENSEBOX_SENSOR_FETCH_REQUESTED,
  SENSEBOX_SENSOR_FETCH_FAILED,
  SENSEBOX_SENSOR_FETCH_SUCCEEDED,

  GEOCODING_FETCH_REQUESTED,
  GEOCODING_FETCH_FAILED,
  GEOCODING_FETCH_SUCCEEDED,

  SUN_API_FETCH_REQUESTED,
  SUN_API_FETCH_FAILED,
  SUN_API_FETCH_SUCCEEDED,
} from "../action_types/app_state";
import { createAction } from "redux-actions";

const requestWeatherDataFetch = createAction(WEATHER_DATA_FETCH_REQUESTED);
const failWeatherDataFetch = createAction(WEATHER_DATA_FETCH_FAILED);
const succeedWeatherDataFetch = createAction(WEATHER_DATA_FETCH_SUCCEEDED);

const requestSenseboxesDataFetch = createAction(SENSEBOXES_FETCH_REQUESTED);
const failSenseboxesDataFetch = createAction(SENSEBOXES_FETCH_FAILED);
const succeedSenseboxesDataFetch = createAction(SENSEBOXES_FETCH_SUCCEEDED);

const requestSenseboxInfoDataFetch = createAction(SENSEBOX_INFO_FETCH_REQUESTED);
const failSenseboxInfoDataFetch = createAction(SENSEBOX_INFO_FETCH_FAILED);
const succeedSenseboxInfoDataFetch = createAction(SENSEBOX_INFO_FETCH_SUCCEEDED);

const requestSenseboxDBMiscDataFetch = createAction(SENSEBOX_DB_MISC_FETCH_REQUESTED);
const failSenseboxDBMiscDataFetch = createAction(SENSEBOX_DB_MISC_FETCH_FAILED);
const succeedSenseboxDBMiscDataFetch = createAction(SENSEBOX_DB_MISC_FETCH_SUCCEEDED);

const requestSenseboxSensorDataFetch = createAction(SENSEBOX_SENSOR_FETCH_REQUESTED);
const failSenseboxSensorDataFetch = createAction(SENSEBOX_SENSOR_FETCH_FAILED);
const succeedSenseboxSensorDataFetch = createAction(SENSEBOX_SENSOR_FETCH_SUCCEEDED);

const requestGeocodingDataFetch = createAction(GEOCODING_FETCH_REQUESTED);
const failGeocodingDataFetch = createAction(GEOCODING_FETCH_FAILED);
const succeedGeocodingDataFetch = createAction(GEOCODING_FETCH_SUCCEEDED);

const requestSunApiDataFetch = createAction(SUN_API_FETCH_REQUESTED);
const failSunApiDataFetch = createAction(SUN_API_FETCH_FAILED);
const succeedSunApiDataFetch = createAction(SUN_API_FETCH_SUCCEEDED);

export {
  requestWeatherDataFetch,
  failWeatherDataFetch,
  succeedWeatherDataFetch,

  requestSenseboxesDataFetch,
  failSenseboxesDataFetch,
  succeedSenseboxesDataFetch,

  requestSenseboxInfoDataFetch,
  failSenseboxInfoDataFetch,
  succeedSenseboxInfoDataFetch,

  requestSenseboxDBMiscDataFetch,
  failSenseboxDBMiscDataFetch,
  succeedSenseboxDBMiscDataFetch,

  requestSenseboxSensorDataFetch,
  failSenseboxSensorDataFetch,
  succeedSenseboxSensorDataFetch,

  requestGeocodingDataFetch,
  failGeocodingDataFetch,
  succeedGeocodingDataFetch,

  requestSunApiDataFetch,
  failSunApiDataFetch, 
  succeedSunApiDataFetch,
};
