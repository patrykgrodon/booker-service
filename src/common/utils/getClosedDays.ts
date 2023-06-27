import { Settings } from "modules/settings/types";

export const getClosedDays = (settings: Settings | undefined) => {
  if (!settings) return [];
  const { openingHours } = settings;
  const closedDays: string[] = [];

  const allDays = Object.keys(openingHours) as (keyof typeof openingHours)[];

  allDays.forEach((day) => {
    if (!openingHours[day].open) {
      const capitalizedDay = `${day.slice(0, 1).toUpperCase()}${day.slice(1)}`;
      closedDays.push(capitalizedDay);
    }
  });

  return closedDays;
};
