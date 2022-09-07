const isFloat = (n) => Number(n) === n && n % 1 !== 0;

const capString = (s, at = 20) => {
  if (s.length < at) return s;
  return s.slice(0, at) + "...";
};

export { isFloat, capString };
