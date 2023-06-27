import { OpeningHours } from "modules/settings/types";
import { getOpenToDate } from "./getOpenToDate";
import { getOpenFromDate } from "./getOpenFromDate";
import { isAfter, isBefore } from "date-fns";
import { getWeekDay } from "./getWeekDay";

export const checkIfDateMatchOpeningHours = (
  date: Date,
  openingHours: OpeningHours
) => {
  const daySettings = openingHours[getWeekDay(date)];

  const { from, to, open } = daySettings;

  const openToDate = getOpenToDate(date, to);
  const openFromDate = getOpenFromDate(date, from);

  const match =
    open && !isAfter(date, openToDate) && !isBefore(date, openFromDate);

  return match;
};
