import { Box, Divider, Menu, Typography } from "@mui/material";
import { format } from "date-fns";
import { CalendarEvent } from "modules/calendar/types";

type MoreEventsMenuProps = {
  closeMenu: () => void;
  moreEventsData: { events: CalendarEvent[]; date: Date };
  menuEl: Element | null;
};

const MoreEventsMenu = ({
  moreEventsData,
  closeMenu,
  menuEl,
}: MoreEventsMenuProps) => {
  return (
    <Menu
      open={!!menuEl}
      anchorEl={menuEl}
      onClose={closeMenu}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <Typography variant="subtitle1" sx={{ px: 2, pt: 1 }}>
        {format(moreEventsData.date, "dd LLLL yyyy")}
      </Typography>
      <Divider />
      <Box sx={{ pb: 0.5 }}>
        {moreEventsData.events.map((event) => (
          <MoreEventMenuItem key={event.id} event={event} />
        ))}
      </Box>
    </Menu>
  );
};

export default MoreEventsMenu;

const MoreEventMenuItem = ({ event }: { event: CalendarEvent }) => {
  const { customer } = event;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        columnGap: 1,
        py: 0.5,
        px: 2,
        "&:not(:last-child)": {
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Typography>
        {customer
          ? `${customer.firstName} ${customer.lastName}`
          : "Customer deleted"}
      </Typography>

      <Typography textAlign="right">
        {`${format(event.startAt, "HH:mm")} - ${format(event.endAt, "HH:mm")}`}
      </Typography>
    </Box>
  );
};
