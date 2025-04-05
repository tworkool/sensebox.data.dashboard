const ENVIRONMENT = {
  INFO: import.meta.env.MODE,
  MAPBOX_PUBLIC_KEY: import.meta.env.VITE_MAPBOX_PUBLIC_KEY,
  MOCK_API_DATA: import.meta.env.VITE_MOCK_API_DATA == "True" ? true : false,
  CONSOLE_LOGS: import.meta.env.VITE_CONSOLE_LOGS == "True" ? true : false,
  POSTHOG_API_TOKEN: import.meta.env.VITE_POSTHOG_API_TOKEN ?? "",
  LOCATION_IQ_API_TOKEN: import.meta.env.VITE_LOCATION_IQ_API_TOKEN ?? "",
};

const CONSTANTS = {
  THEME_LOCALSTORAGE_KEY: "sbd-color-theme",
  SETTINGS_LOCALSTORAGE_KEY: "dashboard-settings",
  OVERVIEW_BOX_INFO_LOCALSTORAGE_KEY: "overview-box-info",
  OSEM_API_URL: "https://api.opensensemap.org/",
  MOCKOON_MOCK_API_URL: "http://localhost:3001/",
  POSTHOG_HOST_URL: "https://app.posthog.com",
  LOCATION_IQ_API_URL: "https://us1.locationiq.com/v1/",
  SUNRISE_SUNSET_API_URL: "https://api.sunrise-sunset.org/json",
};

if (ENVIRONMENT.MOCK_API_DATA) {
  // Redirect to the mock API if the mock data is enabled
  // add API prefix as identifier for the mock API
  console.info(`[MOCK API] Redirecting to mock API '${CONSTANTS.MOCKOON_MOCK_API_URL}'`);
  CONSTANTS.OSEM_API_URL = CONSTANTS.MOCKOON_MOCK_API_URL + "osem";  // Redirect to the mock URL
  CONSTANTS.LOCATION_IQ_API_URL = CONSTANTS.MOCKOON_MOCK_API_URL + "locationIQ";  // Redirect to the mock URL
  CONSTANTS.SUNRISE_SUNSET_API_URL = CONSTANTS.MOCKOON_MOCK_API_URL + "sunriseSunset";  // Redirect to the mock URL
}

export {
  CONSTANTS,
  ENVIRONMENT
};
