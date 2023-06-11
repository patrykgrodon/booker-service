import { endOfWeek, lastDayOfMonth, startOfWeek } from "date-fns";
import { View } from "react-big-calendar";
import enGB from "date-fns/locale/en-GB";

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

export const getStartOfTheWeek = (incDate?: Date) => {
  const date = incDate ? new Date(incDate) : new Date();
  return getStartOfTheDay(startOfWeek(date, { locale: enGB }));
};
export const getEndOfTheWeek = (incDate?: Date) => {
  const date = incDate ? new Date(incDate) : new Date();
  return getEndOfTheDay(endOfWeek(date, { locale: enGB }));
};

export const getRangeDependOnView = (date: Date, view: View): [Date, Date] => {
  if (view === "agenda" || view === "day") {
    return [getStartOfTheDay(date), getEndOfTheDay(date)];
  } else if (view === "week") {
    return [getStartOfTheWeek(date), getEndOfTheWeek(date)];
  } else if (view === "month") {
    return [getStartOfTheMonth(date), getEndOfTheMonth(date)];
  } else {
    return [getStartOfTheWeek(date), getEndOfTheWeek(date)];
  }
};
