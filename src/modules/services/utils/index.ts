import { sub, format, add, setHours, setMinutes } from "date-fns";

export const getOpeningHoursAsDate = (
  openingHours: {
    from: string;
    to: string;
  },
  date: Date
) => {
  const { from, to } = openingHours;
  const [hFrom, mFrom] = from.split(":");
  const [hTo, mTo] = to.split(":");

  return {
    from: setHours(setMinutes(date, +mFrom), +hFrom),
    to: setHours(setMinutes(date, +mTo), +hTo),
  };
};

export const createAvailableHours = (
  openingHours: { from: string; to: string },
  serviceDuration: string,
  date: Date
) => {
  let availableHours: { asDate: Date; asString: string }[] = [];
  const [h, m] = serviceDuration.split(":");
  const openingHoursAsDate = getOpeningHoursAsDate(openingHours, date);
  let current = openingHoursAsDate.from;
  while (sub(openingHoursAsDate.to, { hours: +h, minutes: +m }) >= current) {
    availableHours.push({
      asDate: current,
      asString: format(current, "HH:mm"),
    });
    current = add(current, { minutes: 15 });
  }
  return availableHours;
};
