import { addDays, isAfter } from "date-fns";
import { Settings } from "modules/settings/types";
import { getDefaultDateTimeFrom } from "./getDefaultDateTimeFrom";
import { checkIfDateMatchOpeningHours } from "../../../common/utils/checkIfDateMatchOpeningHours";
import { getOpenToDate } from "common/utils/getOpenToDate";
import { getWeekDay } from "common/utils/getWeekDay";

export const getNearestPossibleVisitDate = (settings: Settings | undefined) => {
  let visitDate = getDefaultDateTimeFrom();
  if (!settings) return visitDate;
  const { openingHours } = settings;

  while (!checkIfDateMatchOpeningHours(visitDate, openingHours)) {
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
