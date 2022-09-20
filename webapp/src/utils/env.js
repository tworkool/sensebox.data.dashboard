const ENVIRONMENT = {
  INFO: process.env.NODE_ENV,
  MAPBOX_PUBLIC_KEY: process.env.MAPBOX_PUBLIC_KEY,
  MOCK_API_DATA: process.env.MOCK_API_DATA == "True" ? true : false,
  CONSOLE_LOGS: process.env.CONSOLE_LOGS == "True" ? true : false,
};

export default ENVIRONMENT;
