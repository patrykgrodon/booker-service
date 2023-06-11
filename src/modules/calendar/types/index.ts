import { View } from "react-big-calendar";

export type CalendarEvent = {
  date: Date;
};

export type CalendarSSUi = {
  view?: View;
  dateRange?: [string, string];
};
