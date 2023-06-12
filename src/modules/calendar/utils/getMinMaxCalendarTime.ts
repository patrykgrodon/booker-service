import { OpeningHours } from "modules/settings/types";

export const getMinMaxCalendarTime = (
  openingHours: OpeningHours | undefined
) => {
  if (!openingHours)
    return {
      minTime: new Date(1972, 0, 1, 0, 0, 0),
      maxTime: new Date(1972, 0, 1, 23, 59, 59),
    };

  const keys = Object.keys(openingHours) as (keyof typeof openingHours)[];

  const min = Math.min(
    ...keys.map((key) => {
      const { hour, minute } = openingHours[key].from;
      return new Date(1972, 0, 1, +hour, +minute).getTime();
    })
  );
  const max = Math.max(
    ...keys.map((key) => {
      const { hour, minute } = openingHours[key].to;
      return new Date(1972, 0, 1, +hour, +minute).getTime();
    })
  );

  return {
    minTime: new Date(min),
    maxTime: new Date(max),
  };
};
