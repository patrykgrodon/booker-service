import { addDays, format, isAfter, isBefore } from "date-fns";
import { DaySettings, Settings } from "modules/settings/types";
import { getDefaultDateTimeFrom } from "./getDefaultDateTimeFrom";

export const getNearestPossibleVisitDate = (settings: Settings | undefined) => {
  let visitDate = getDefaultDateTimeFrom();
  if (!settings) return visitDate;
  const { openingHours } = settings;

  while (
    !checkIfDateMatchOpeningHours(
      visitDate,
      openingHours[getWeekDay(visitDate)]
    )
  ) {
    const daySettings = openingHours[getWeekDay(visitDate)];

    const openToDate = getOpenToDate(visitDate, daySettings.to);

    if (!daySettings.open || isAfter(visitDate, openToDate)) {
      visitDate = addDays(visitDate, 1);
      visitDate.setHours(0, 0, 0, 0);
    } else {
      visitDate.setHours(
        +daySettings.from.hour,
        +daySettings.from.minute,
        0,
        0
      );
    }
  }
  return visitDate;
};

const getWeekDay = (date: Date) => {
  return format(date, "EEEE").toLowerCase() as keyof Settings["openingHours"];
};

const checkIfDateMatchOpeningHours = (date: Date, daySettings: DaySettings) => {
  const { from, to, open } = daySettings;

  const openToDate = getOpenToDate(date, to);
  const openFromDate = getOpenFromDate(date, from);

  const match =
    open && !isAfter(date, openToDate) && !isBefore(date, openFromDate);

  return match;
};

const getOpenToDate = (date: Date, to: { hour: string; minute: string }) => {
  const openToDate = new Date(date.getTime());
  openToDate.setHours(+to.hour, +to.minute, 0, 0);
  return openToDate;
};
const getOpenFromDate = (
  date: Date,
  from: { hour: string; minute: string }
) => {
  const openFromDate = new Date(date.getTime());
  openFromDate.setHours(+from.hour, +from.minute, 0, 0);
  return openFromDate;
};
