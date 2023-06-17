export const drawNumber = (numMin: number, numMax: number) => {
  numMin = Math.round(numMin);
  numMax = Math.round(numMax);
  if (numMax < numMin) {
    const t = numMin;
    numMin = numMax;
    numMax = t;
  }
  return Math.floor(Math.random() * (numMax + 1 - numMin) + numMin);
};
