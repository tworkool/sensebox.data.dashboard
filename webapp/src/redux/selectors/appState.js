const getWeatherData = (state) => {
  return state.appState.weatherData;
};

const getSenseboxesData = (state) => {
  return state.appState.senseboxesData;
};

const getSenseboxInfoData = (state) => {
  return state.appState.senseboxInfoData;
};

export { getWeatherData, getSenseboxesData, getSenseboxInfoData };
