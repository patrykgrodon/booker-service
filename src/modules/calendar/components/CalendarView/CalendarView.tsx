import { Calendar, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { isEqual } from "date-fns";

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
import useSettings from "modules/settings/hooks/useSettings";
import { getMinMaxCalendarTime } from "modules/calendar/utils/getMinMaxCalendarTime";
import { VisitsDetailsDialog } from "modules/visits/components";
import { useMenu } from "common/hooks";
import MoreEventsMenu from "./MoreEventsMenu";

const convertVisitsToCalendarEvents = (visits: Visit[]): CalendarEvent[] => {
  if (visits === undefined) return [];
  return visits;
};

type CalendarViewProps = {
  checkedEmployees: string[];
};

const CalendarView = ({ checkedEmployees }: CalendarViewProps) => {
  const {
    view,
    changeView,
    dateRange,
    changeDateRange,
    visits,
    refetchVisits,
  } = useCalendarView(checkedEmployees);
  const { settings } = useSettings();

  const {
    openMenu: openMoreEvents,
    closeMenu: closeMoreEvents,
    menuEl: moreEventsMenuEl,
  } = useMenu();

  const [moreEventsData, setMoreEventsData] = useState<{
    events: CalendarEvent[];
    date: Date;
  } | null>(null);
  const [previewVisitUuid, setPreviewVisitUuid] = useState<string | null>(null);

  const events = useMemo(
    () => convertVisitsToCalendarEvents(visits || []),
    [visits]
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

  const { maxTime, minTime } = getMinMaxCalendarTime(settings?.openingHours);

  const showMore = (count: number) => (
    <Box
      sx={{ textAlign: "center", width: "100%" }}
      onClick={(e: any) => openMoreEvents(e.currentTarget)}
    >
      Show more +{count}
    </Box>
  );

  return (
    <CalendarViewContainer view={view}>
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
        onSelectEvent={(event) => setPreviewVisitUuid(event.id)}
        components={{
          event: Event,
        }}
        messages={{
          // @ts-ignore
          showMore,
        }}
        onShowMore={(events, date) => {
          setMoreEventsData({ events, date });
        }}
        min={minTime}
        max={maxTime}
        eventPropGetter={(visit) => ({
          style: {
            fontSize: ".85rem",
            ...(view === "agenda"
              ? {}
              : {
                  backgroundColor: visit.employee
                    ? visit.employee.calendarColor
                    : "red",
                }),
          },
        })}
        formats={calendarSettings.formats}
      />
      {!!previewVisitUuid && (
        <VisitsDetailsDialog
          onEditSuccess={refetchVisits}
          onDeleteSuccess={() => {
            refetchVisits();
            setPreviewVisitUuid(null);
          }}
          handleClose={() => setPreviewVisitUuid(null)}
          isOpen
          id={previewVisitUuid}
        />
      )}
      {!!moreEventsData && (
        <MoreEventsMenu
          closeMenu={closeMoreEvents}
          menuEl={moreEventsMenuEl}
          moreEventsData={moreEventsData}
        />
      )}
    </CalendarViewContainer>
  );
};

export default CalendarView;
