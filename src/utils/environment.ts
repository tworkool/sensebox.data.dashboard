const ENVIRONMENT = {
  INFO: import.meta.env.MODE,
  MAPBOX_PUBLIC_KEY: import.meta.env.MAPBOX_PUBLIC_KEY,
  MOCK_API_DATA: import.meta.env.VITE_MOCK_API_DATA == "True" ? true : false,
  CONSOLE_LOGS: import.meta.env.VITE_CONSOLE_LOGS == "True" ? true : false,
  POSTHOG_API_TOKEN: import.meta.env.POSTHOG_API_TOKEN ?? "",
  LOCATION_IQ_API_TOKEN: import.meta.env.LOCATION_IQ_API_TOKEN ?? "",
};

const CONSTANTS = {
  THEME_LOCALSTORAGE_KEY: "sbd-color-theme",
  SETTINGS_LOCALSTORAGE_KEY: "dashboard-settings",
  PINNED_BOX_LOCALSTORAGE_KEY: "pinned-box",
  OSEM_API_URL: "https://api.opensensemap.org/",
  OSEM_MOCK_API_URL: "http://localhost:3001/",
  POSTHOG_HOST_URL: "https://app.posthog.com",
};

if (ENVIRONMENT.MOCK_API_DATA) {
  console.log(`[MOCK API] Redirecting to mock API '${CONSTANTS.OSEM_MOCK_API_URL}'`);
  CONSTANTS.OSEM_API_URL = CONSTANTS.OSEM_MOCK_API_URL;  // Redirect to the mock URL
}

export {
  CONSTANTS,
  ENVIRONMENT
};
