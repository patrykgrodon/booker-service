import { Typography } from "@mui/material";
import { CalendarEvent } from "modules/calendar/types";

type EventProps = {
  event: CalendarEvent;
};

const Event = ({ event }: EventProps) => {
  const { customer } = event;
  return (
    <Typography
      variant="inherit"
      sx={{ lineHeight: 1.3, cursor: "pointer", width: "max-content" }}
    >
      {customer.firstName} {customer.lastName}
    </Typography>
  );
};

export default Event;
