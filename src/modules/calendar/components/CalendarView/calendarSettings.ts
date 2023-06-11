import { dateFnsLocalizer } from "react-big-calendar";
import { format, getDay, parse, startOfWeek } from "date-fns";
import enGB from "date-fns/locale/en-GB";

const locale = enGB;

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (
    date: number | Date,
    options?:
      | {
          locale?: Locale | undefined;
          weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
        }
      | undefined
  ) => startOfWeek(date, { ...options, weekStartsOn: 1 }),
  getDay,
  locales: {
    enGB,
  },
});

const formats = {
  dayHeaderFormat: (date: Date) => format(date, "dd LLLL yyyy", { locale }),
  monthHeaderFormat: (date: Date) => format(date, "LLLL yyyy", { locale }),
  dayRangeHeaderFormat: getDayRangeFormat,
  agendaHeaderFormat: (date: { start: Date }) =>
    format(date.start, "dd LLLL yyyy", { locale }),
};

function getDayRangeFormat(date: { start: Date; end: Date }) {
  if (date.start.getFullYear() !== date.end.getFullYear()) {
    return `${format(date.start, "dd LLLL yyyy", {
      locale,
    })} - ${format(date.end, "dd LLLL yyyy", { locale })}`;
  } else if (date.start.getMonth() !== date.end.getMonth()) {
    return `${format(date.start, "dd LLLL", {
      locale,
    })} - ${format(date.end, "dd LLLL yyyy", { locale })}`;
  } else
    return `${format(date.start, "dd", {
      locale,
    })} - ${format(date.end, "dd LLLL yyyy", { locale })}`;
}

const calendarSettings = {
  localizer,
  formats,
} as const;

export default calendarSettings;
