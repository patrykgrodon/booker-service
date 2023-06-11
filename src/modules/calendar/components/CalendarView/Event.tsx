import { Typography } from "@mui/material";
import { CalendarEvent } from "modules/calendar/types";

type EventProps = {
  event: CalendarEvent;
};

const Event = ({ event }: EventProps) => {
  const { customer } = event;
  return (
    <Typography variant="subtitle2" sx={{ lineHeight: 1.3, display: "block" }}>
      {customer.firstName} {customer.lastName}
    </Typography>
  );
};

export default Event;
