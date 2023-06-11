import { lastDayOfMonth } from "date-fns";

export const getStartOfTheDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  return newDate;
};

export const getEndOfTheDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(23);
  newDate.setMinutes(59);
  newDate.setSeconds(59);
  return newDate;
};

export const getStartOfTheMonth = (incDate?: Date) => {
  const date = incDate ? new Date(incDate) : new Date();
  date.setDate(1);
  return getStartOfTheDay(date);
};
export const getEndOfTheMonth = (incDate?: Date) => {
  const date = incDate ? new Date(incDate) : new Date();
  return getEndOfTheDay(lastDayOfMonth(date));
};
