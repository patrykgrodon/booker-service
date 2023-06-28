import { calendarColors } from "common/constants/calendarColors";
import { drawNumber } from "common/utils/drawNumber";

export const getDefaultCalendarColor = () => {
  return calendarColors[drawNumber(0, calendarColors.length - 1)];
};
