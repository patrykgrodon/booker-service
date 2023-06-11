import { Calendar, View } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

import calendarSettings from "./calendarSettings";
import CalendarViewContainer from "./CalendarViewContainer";
import useCalendarView from "modules/calendar/hooks/useCalendarView";
import {
  getEndOfTheDay,
  getStartOfTheDay,
} from "modules/calendar/utils/calendarViewUtils";

const CalendarView = () => {
  const { view, changeView, changeDateRange } = useCalendarView();

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

  return (
    <CalendarViewContainer>
      <Calendar
        localizer={calendarSettings.localizer}
        culture="enGB"
        length={1}
        selectable
        view={view}
        onView={changeView}
        onRangeChange={handleRangeChange}
      />
    </CalendarViewContainer>
  );
};

export default CalendarView;
