import { format } from "date-fns";
import { Settings } from "modules/settings/types";

export const getWeekDay = (date: Date) => {
  return format(date, "EEEE").toLowerCase() as keyof Settings["openingHours"];
};
