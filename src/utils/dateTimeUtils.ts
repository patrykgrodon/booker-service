export const addZeroBelowTen = (value: number) =>
  (value < 10 ? "0" : "") + value;

export const convertSecToMins = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${addZeroBelowTen(minutes)}:${addZeroBelowTen(rest)}`;
};

export const convertSecToHours = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;
  return `${addZeroBelowTen(hours)}:${addZeroBelowTen(
    minutes
  )}:${addZeroBelowTen(rest)}`;
};

export const today = () => new Date();

export const getTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const dashedDateTimeFormat = "yyyy-MM-dd HH:mm:ss";
export const dashedDateFormat = "yyyy-MM-dd";
export const dashedDateTimeFormatNoSeconds = "yyyy-MM-dd HH:mm";
