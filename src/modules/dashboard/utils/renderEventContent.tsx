import { EventContentArg } from "@fullcalendar/react";
import { Box } from "@mui/material";

export const renderEventContent = (eventContent: EventContentArg) => {
  const { extendedProps } = eventContent.event;
  return (
    <Box>
      <b>{eventContent.timeText}</b> <br />
      <i>{eventContent.event.title}</i>
      <br />
      <b>
        {extendedProps.firstName} {extendedProps.lastName}
      </b>
    </Box>
  );
};
