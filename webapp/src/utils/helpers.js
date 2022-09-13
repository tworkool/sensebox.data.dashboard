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

export { isFloat, capString, getMinuteFormattedString };
