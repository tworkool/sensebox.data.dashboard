const ENVIRONMENT = {
  ENV: process.env.NODE_ENV,
  TEST_ENV: process.env.TEST_ENV,
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
  MOCK_API_DATA: process.env.MOCK_API_DATA == "True" ? true : false,
};

export default ENVIRONMENT;
