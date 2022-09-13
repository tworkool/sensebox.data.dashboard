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

export {
  getWeatherData,
  getSenseboxesData,
  getSenseboxInfoData,
  getSenseboxDBMiscData,
  getSenseboxSensorData,
};
