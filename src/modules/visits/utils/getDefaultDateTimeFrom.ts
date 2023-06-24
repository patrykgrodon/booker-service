import { getMinutes } from "date-fns";

export const getDefaultDateTimeFrom = (minutesStep = 15, date = new Date()) => {
  const minutes = getMinutes(date);
  const minutesLeftToRound = minutes % minutesStep;

  if (minutesLeftToRound > 0) {
    date.setMinutes(minutes + (minutesStep - minutesLeftToRound));
  }
  date.setSeconds(0);
  return date;
};
