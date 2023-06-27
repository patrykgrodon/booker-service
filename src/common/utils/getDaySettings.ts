import { format } from "date-fns";
import { Settings } from "modules/settings/types";

export const getDaySettings = (settings: Settings | undefined, date: Date) => {
  if (!settings) return undefined;
  const { openingHours } = settings;
  const weekDay = format(
    date,
    "EEEE"
  ).toLowerCase() as keyof Settings["openingHours"];

  return openingHours[weekDay];
};
