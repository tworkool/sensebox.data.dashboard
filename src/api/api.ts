import axios, { InternalAxiosRequestConfig } from "axios"; // Ensure all imports are used
import { CONSTANTS, ENVIRONMENT } from "@utils/environment.js";

const isUsingMockApi = (config: InternalAxiosRequestConfig<string>) => 
  config.baseURL?.includes(CONSTANTS.MOCKOON_MOCK_API_URL) || 
  config.baseURL?.includes("localhost") || 
  config.baseURL?.includes("127.0.0.1");

const OSEMApiClient = axios.create({
  baseURL: CONSTANTS.OSEM_API_URL,
});

const LocationIQApiClient = axios.create({
  baseURL: CONSTANTS.LOCATION_IQ_API_URL,
  params: {
    key: ENVIRONMENT.LOCATION_IQ_API_TOKEN,
    format: "json",
    normalizeaddress: 1,
  }
});

const SunriseSunsetApiClient = axios.create({
  baseURL: CONSTANTS.SUNRISE_SUNSET_API_URL,
});
// https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today&formatted=0

// reject api calls coming from localhost, because CORS does not allow them anyway!
// this way it can be prevented to send requests to the api from localhost, which would fail anyway
SunriseSunsetApiClient.interceptors.request.use((config) => {
  const currentHostname = window.location.hostname;
  const isLocalhostRequester = currentHostname === "localhost" || currentHostname === "127.0.0.1";

  if (isLocalhostRequester && !isUsingMockApi(config)) {
    const controller = new AbortController();
    config.signal = controller.signal;
    controller.abort(); // Cancel immediately

    console.warn("Requests from localhost are blocked!");
    throw new axios.Cancel("Requests from localhost are blocked.");
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

LocationIQApiClient.interceptors.request.use((config) => {
  const hasApiKey = ENVIRONMENT.LOCATION_IQ_API_TOKEN && ENVIRONMENT.LOCATION_IQ_API_TOKEN.toString().length > 0;

  if (!isUsingMockApi(config) && !hasApiKey) {
    const controller = new AbortController();
    config.signal = controller.signal;
    controller.abort(); // Cancel immediately

    console.warn("API Key for LocationIQ API is missing!");
    throw new axios.Cancel("API Key for LocationIQ API is missing!");
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

LocationIQApiClient.interceptors.response.use(
  (response) => {
    if (ENVIRONMENT.CONSOLE_LOGS && response.status === 429) {
      console.warn("Rate limit exceeded for LocationIQ API. Please try again later.");
    }
    return response;
  },
);

// Add a request interceptor
/* OSEMApiClient.interceptors.request.use(
  (config) => {
    // mock api redirect
    if (ENVIRONMENT.MOCK_API_DATA) {
      config.baseURL = CONSTANTS.OSEM_MOCK_API_URL;  // Redirect to the mock URL
    }

    return config;
  },
  (error) => {
    console.error("OSEMApiClient request interceptor error", error);
    // Handle request errors here
    return Promise.reject(error);
  }
); */

class RelativePathBuilder {
  private path: string;
  private queryParams = 0;
  private urlParams = 0;

  constructor(path?: string) {
    this.path = path || "";
  }

  public appendUrlParam(value: string): RelativePathBuilder {
    if (value === null || value === undefined) return this;
    if (this.path.lastIndexOf("/") !== this.path.length - 1) {
      this.path += "/";
    }
    this.path += value;
    this.urlParams++;
    return this;
  }

  public appendQueryParam(key: string, value: string): RelativePathBuilder {
    if (value === null || value === undefined || !key) return this;
    if (this.queryParams === 0) {
      this.path += "?";
    } else {
      this.path += "&";
    }
    this.path += `${key}=${value}`;
    this.queryParams++;
    return this;
  }

  public appendQueryParams(params: Record<string, string>): RelativePathBuilder {
    for (const key in params) {
      this.appendQueryParam(key, params[key]);
    }
    return this;
  }

  public build(): string {
    return this.path;
  }
}

export {
  RelativePathBuilder,
  OSEMApiClient,
  LocationIQApiClient,
  SunriseSunsetApiClient,
};
