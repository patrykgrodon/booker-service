import { Visit } from "common/providers/VisitsProvider";
import {
  sub,
  format,
  add,
  setHours,
  setMinutes,
  isToday,
  isBefore,
  addHours,
  addMinutes,
  isAfter,
  isEqual,
} from "date-fns";

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

export const createStartEndVisitDates = (visitDate: Date, duration: string) => {
  const [h, m] = duration.split(":");

  return { start: visitDate, end: addHours(addMinutes(visitDate, +m), +h) };
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

export const removeBeforeNowAvailableHours = (
  availableHours: { asDate: Date; asString: string }[]
) => {
  if (isToday(availableHours[0].asDate)) {
    return availableHours.filter(({ asDate }) => !isBefore(asDate, new Date()));
  } else {
    return availableHours;
  }
};

export const filterAvailableHours = (
  availableHours: { asDate: Date; asString: string }[],
  visits: Visit[]
) => {
  if (availableHours.length === 0) return availableHours;

  if (visits.length === 0) return removeBeforeNowAvailableHours(availableHours);

  const visitsStartEnd = visits.map(({ date, service }) =>
    createStartEndVisitDates(date, service.duration)
  );
  const filteredAvailableHours = availableHours.filter(({ asDate }) => {
    let overlap = false;
    visitsStartEnd.forEach(({ start, end }) => {
      if (
        (isAfter(asDate, start) || isEqual(asDate, start)) &&
        isBefore(asDate, end)
      ) {
        overlap = true;
        return;
      }
    });
    return !overlap;
  });
  return removeBeforeNowAvailableHours(filteredAvailableHours);
};
