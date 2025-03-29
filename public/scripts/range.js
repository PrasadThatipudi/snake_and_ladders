const isNegative = (number) => number < 0;

const range = (from, to, step = 1) => {
  if (step === 0 || isNegative(to - from) !== isNegative(step)) return [];

  const noOfTerms = Math.ceil(Math.abs((to - from) / step));
  return Array.from({ length: noOfTerms }, (_, index) => from + index * step);
};

export { range };
