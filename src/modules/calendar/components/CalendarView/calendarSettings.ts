import { dateFnsLocalizer } from "react-big-calendar";
import { format, getDay, parse, startOfWeek } from "date-fns";
import enGB from "date-fns/locale/en-GB";

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

const calendarSettings = {
  localizer,
} as const;

export default calendarSettings;
