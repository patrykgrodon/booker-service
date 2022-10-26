import FullCalendar, { DateSelectArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box, Paper } from "@mui/material";

import { Spinner } from "common/components";
import { useServiceCalendar } from "modules/dashboard/contexts/serviceProviderCalendarContext";
import { renderEventContent } from "modules/dashboard/utils/renderEventContent";

const ServiceProviderCalendar = () => {
  // const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const { events, handleDatesSet, isLoading } = useServiceCalendar();

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: "3",
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  // const handleEventClick = (clickInfo: EventClickArg) => {
  //   clickInfo.event.remove();
  // };

  // const handleEvents = (events: EventApi[]) => {
  //   // setCurrentEvents(events);
  //   // console.log(events);
  // };

  if (isLoading) return <Spinner size="medium" />;

  return (
    <Box
      sx={{
        flex: 1,
      }}>
      <Paper
        sx={{
          padding: (theme) => theme.spacing(2),
          maxHeight: "100%",
          overflow: "auto",
        }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="timeGridWeek"
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          allDaySlot={false}
          slotDuration="00:15:00"
          slotMinTime="08:00:00"
          eventOverlap={false}
          slotMaxTime="16:00:00"
          editable={false}
          hiddenDays={[0]}
          selectable={false}
          selectMirror={true}
          dayMaxEvents={true}
          eventColor={"#344a5f"}
          // weekends={false}
          events={events}
          select={handleDateSelect}
          datesSet={handleDatesSet}
          eventContent={renderEventContent} // custom render function
          // eventClick={handleEventClick}
          // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
      </Paper>
    </Box>
  );
};

export default ServiceProviderCalendar;
