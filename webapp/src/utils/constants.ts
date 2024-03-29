const CONSTANTS = {
  SENSEBOX_INACTIVITY_TIME_DAYS: 3,
  SENSEBOX_SENSOR_INACTIVITY_TIME_HOURS: 25,
  MAX_BOOKMARKED_BOXES: 5,
  MIN_SENSEBOX_SEARCH_CHARACTERS: 3,
  LIVE_ANALYTICS_INTERVAL_STEPS: 5, // s
  DEFAULT_NULL_FALLBACK_VALUE: "-",
  MIN_LIVE_UPDATE_DISPATCH_INTERVAL: 60, //s
  MAX_LIVE_UPDATE_DISPATCH_INTERVAL: 360, //s - 6 minutes
  ROUTING: {
    SENSEBOX_ID: "boxid"
  },
  DATE_FORMAT: "MMM Do YY",
  LAST_SENSEBOX_ID: "LAST_SENSEBOX_ID"
};

export default CONSTANTS;