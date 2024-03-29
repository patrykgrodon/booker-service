import { Visit } from "modules/visits/types";
import { View } from "react-big-calendar";

export type CalendarEvent = Visit;

export type CalendarLSUi = {
  view?: View;
  dateRange?: [string, string];
};
