import { Box } from "@mui/material";
import { isEqual } from "date-fns";
import { useMemo, useState } from "react";
import {
  Calendar,
  DayPropGetter,
  EventPropGetter,
  SlotInfo,
  View,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useMenu } from "common/hooks";
import useCalendarView from "modules/calendar/hooks/useCalendarView";
import { CalendarEvent } from "modules/calendar/types";
import {
  getEndOfTheDay,
  getRangeDependOnView,
  getStartOfTheDay,
} from "modules/calendar/utils/calendarViewUtils";
import { getMinMaxCalendarTime } from "modules/calendar/utils/getMinMaxCalendarTime";
import useSettings from "modules/settings/hooks/useSettings";
import { VisitsDetailsDialog } from "modules/visits/components";
import { Visit, VisitFormValues } from "modules/visits/types";
import CalendarViewContainer from "./CalendarViewContainer";
import Event from "./Event";
import MoreEventsMenu from "./MoreEventsMenu";
import calendarSettings from "./calendarSettings";
import { VisitFormDialog } from "modules/visits/components";
import { getDaySettings } from "common/utils/getDaySettings";
import { getNearestPossibleVisitDate } from "modules/visits/utils/getNearestPossibleVisitDate";

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

  const [visitFormValues, setVisitFormValues] =
    useState<Partial<VisitFormValues> | null>(null);

  const openVisitForm = (visitFormValues: Partial<VisitFormValues>) =>
    setVisitFormValues(visitFormValues);

  const closeVisitForm = () => setVisitFormValues(null);

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

  const eventPropGetter: EventPropGetter<Visit> = (visit) => {
    const commonStyles = { fontSize: ".85rem" };
    if (view === "agenda") return { style: commonStyles };
    return {
      style: {
        ...commonStyles,
        backgroundColor: visit.employee ? visit.employee.calendarColor : "red",
      },
    };
  };

  const checkIfDayIsOpen = (date: Date) => {
    return !!getDaySettings(settings, date)?.open;
  };

  const dayPropGetter: DayPropGetter = (date) => {
    if (!checkIfDayIsOpen(date)) {
      return { className: "rbc-off-range-bg" };
    }
    return {};
  };

  const onSelectSlot = (slotInfo: SlotInfo) => {
    if (!checkIfDayIsOpen(slotInfo.start)) return;
    openVisitForm({
      date: getNearestPossibleVisitDate(settings, slotInfo.start),
    });
  };

  return (
    <CalendarViewContainer view={view}>
      <Calendar
        localizer={calendarSettings.localizer}
        events={events}
        startAccessor="startAt"
        endAccessor="endAt"
        culture="enGB"
        popup={false}
        selectable
        onSelectSlot={onSelectSlot}
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
        eventPropGetter={eventPropGetter}
        dayPropGetter={dayPropGetter}
        formats={calendarSettings.formats}
        step={15}
      />
      {previewVisitUuid && (
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
      {visitFormValues && (
        <VisitFormDialog
          isOpen
          handleClose={closeVisitForm}
          onSuccess={() => {
            refetchVisits();
            closeVisitForm();
          }}
          formValues={visitFormValues}
        />
      )}
      {moreEventsData && (
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
