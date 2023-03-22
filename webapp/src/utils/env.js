const ENVIRONMENT = {
  INFO: process.env.NODE_ENV,
  MAPBOX_PUBLIC_KEY: process.env.MAPBOX_PUBLIC_KEY,
  MOCK_API_DATA: process.env.MOCK_API_DATA == "True" ? true : false,
  CONSOLE_LOGS: process.env.CONSOLE_LOGS == "True" ? true : false,
  POSTHOG_API_TOKEN: process.env.POSTHOG_API_TOKEN ?? "",
  POSTHOG_API_HOST: process.env.POSTHOG_API_HOST ?? "",
};

export default ENVIRONMENT;
