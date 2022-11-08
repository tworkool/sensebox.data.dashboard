const getWeatherData = (state) => {
  return state.appState.weatherData;
};

const getSenseboxesData = (state) => {
  return state.appState.senseboxesData;
};

const getSenseboxInfoData = (state) => {
  return state.appState.senseboxInfoData;
};

const getSenseboxDBMiscData = (state) => {
  return state.appState.senseboxDBMiscData;
};

const getSenseboxSensorData = (state) => {
  return state.appState.senseboxSensorData;
};

const getGeocodingData = (state) => {
  return state.appState.geocodingData;
};

const getSunApiData = (state) => {
    return state.appState.sunApiData;
  };

export {
  getWeatherData,
  getSenseboxesData,
  getSenseboxInfoData,
  getSenseboxDBMiscData,
  getSenseboxSensorData,
  getGeocodingData,
  getSunApiData,
};
