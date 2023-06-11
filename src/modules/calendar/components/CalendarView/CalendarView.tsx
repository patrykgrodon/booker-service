import { Calendar, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useMemo } from "react";

import calendarSettings from "./calendarSettings";
import CalendarViewContainer from "./CalendarViewContainer";
import useCalendarView from "modules/calendar/hooks/useCalendarView";
import {
  getEndOfTheDay,
  getRangeDependOnView,
  getStartOfTheDay,
} from "modules/calendar/utils/calendarViewUtils";
import { Visit } from "modules/visits/types";
import { CalendarEvent } from "modules/calendar/types";
import Event from "./Event";
import { isEqual } from "date-fns";

const convertVisitsToCalendarEvents = (visits: Visit[]): CalendarEvent[] => {
  if (visits === undefined) return [];
  return visits;
};

const CalendarView = () => {
  const { view, changeView, dateRange, changeDateRange, calendarVisits } =
    useCalendarView();

  const events = useMemo(
    () => convertVisitsToCalendarEvents(calendarVisits || []),
    [calendarVisits]
  );

  const handleRangeChange = (
    range:
      | Date[]
      | {
          start: Date;
          end: Date;
        },
    incView?: View
  ) => {
    const isAgendaView =
      view === "agenda" && !incView ? true : incView === "agenda";
    if (isAgendaView && !Array.isArray(range)) {
      if (incView === "agenda")
        changeDateRange([
          getStartOfTheDay(range.start),
          getEndOfTheDay(range.start),
        ]);
    } else if (Array.isArray(range)) {
      const start = range[0];
      const end = getEndOfTheDay(range[range.length - 1]);
      changeDateRange([start, end]);
    } else {
      changeDateRange([
        getStartOfTheDay(range.start),
        getEndOfTheDay(range.end),
      ]);
    }
  };

  const handleNavigate = (newDate: Date) => {
    const newDateRange = getRangeDependOnView(newDate, view);
    if (
      isEqual(dateRange[0], newDateRange[0]) &&
      isEqual(dateRange[1], newDateRange[1])
    )
      return;
    changeDateRange(newDateRange);
  };

  return (
    <CalendarViewContainer>
      <Calendar
        localizer={calendarSettings.localizer}
        events={events}
        startAccessor="startAt"
        endAccessor="endAt"
        culture="enGB"
        popup={false}
        doShowMoreDrillDown={false}
        length={1}
        view={view}
        onView={changeView}
        onRangeChange={handleRangeChange}
        onNavigate={(newDate) => handleNavigate(newDate)}
        components={{
          event: Event,
        }}
        formats={calendarSettings.formats}
      />
    </CalendarViewContainer>
  );
};

export default CalendarView;
