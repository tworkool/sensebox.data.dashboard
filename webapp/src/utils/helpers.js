import CONSTANTS from "./constants";

const isFloat = (n) => Number(n) === n && n % 1 !== 0;

const capString = (s, at = 20) => {
  if (s.length < at) return s;
  return s.slice(0, at) + "...";
};

const getMinuteFormattedString = (secondsAgo) => {
  if (secondsAgo === null || secondsAgo === undefined) {
    return CONSTANTS.DEFAULT_NULL_FALLBACK_VALUE;
  } else {
    if (secondsAgo < 120) {
      return "now";
    }
    return `${Math.floor(secondsAgo / 60)} minutes ago`;
  }
};

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function getFormattedHoursStringFromSeconds(t) {
  const secondsToHours = t / 3600;
  const hoursComponent = Math.trunc(secondsToHours);
  const minutesComponent = Math.trunc((secondsToHours - hoursComponent) * 60);
  return `${hoursComponent}h ${minutesComponent}min`;
}

export {
  isFloat,
  capString,
  getMinuteFormattedString,
  hexToRgb,
  getFormattedHoursStringFromSeconds,
};
