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

export {
  getWeatherData,
  getSenseboxesData,
  getSenseboxInfoData,
  getSenseboxDBMiscData,
};
