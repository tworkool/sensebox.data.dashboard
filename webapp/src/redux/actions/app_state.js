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
};
