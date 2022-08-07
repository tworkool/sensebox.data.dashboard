import { fetch } from "cross-fetch";
import ENVIRONMENT from "../../../utils/env";
import { isFloat } from "../../../utils/helpers";

const BACKEND = {
  sample_fetch: (lat, lon) => {
    if (!isFloat(lat) || !isFloat(lon)) {
      throw new Error("REQUEST ERROR: lat and lon need to be floats");
    }
    const fetchUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ENVIRONMENT.WEATHER_API_KEY}`;

    return fetch(fetchUrl);
  },
};

export default BACKEND;
