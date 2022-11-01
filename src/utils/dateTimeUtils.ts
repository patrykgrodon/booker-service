import { Timestamp } from "@firebase/firestore";

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

export const now = () => new Date();

export const getTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const dashedDateTimeFormat = "yyyy-MM-dd HH:mm:ss";
export const dashedDateFormat = "yyyy-MM-dd";
export const dashedDateTimeFormatNoSeconds = "yyyy-MM-dd HH:mm";

export const convertToFirebaseTimestamp = (date: Date) => {
  const t = Timestamp.fromDate(date);
  return t;
};

export const getTodayMidnight = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};
