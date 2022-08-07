import {
  WEATHER_DATA_FETCH_FAILED,
  WEATHER_DATA_FETCH_REQUESTED,
  WEATHER_DATA_FETCH_SUCCEEDED,
} from "../action_types/app_state";
import { createAction } from "redux-actions";

const requestWeatherDataFetch = createAction(WEATHER_DATA_FETCH_REQUESTED);
const failWeatherDataFetch = createAction(WEATHER_DATA_FETCH_FAILED);
const succeedWeatherDataFetch = createAction(WEATHER_DATA_FETCH_SUCCEEDED);

export {
  requestWeatherDataFetch,
  failWeatherDataFetch,
  succeedWeatherDataFetch,
};
