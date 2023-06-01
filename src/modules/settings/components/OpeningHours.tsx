import { Box, Typography, IconButton } from "@mui/material";

import { SettingsCard } from "../components";
import { EditOutlined } from "@mui/icons-material";

const defaultOpeningHours = {
  monday: { start: "08:00", end: "16:00", open: false },
  tuesday: { start: "08:00", end: "16:00", open: false },
  wednesday: { start: "08:00", end: "16:00", open: false },
  thursday: { start: "08:00", end: "16:00", open: false },
  friday: { start: "08:00", end: "16:00", open: false },
  saturday: { start: "08:00", end: "16:00", open: false },
  sunday: { start: "08:00", end: "16:00", open: false },
};

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as (keyof typeof defaultOpeningHours)[];

const OpeningHours = () => {
  const openingHoursWithDay = days.map((day) => ({
    ...defaultOpeningHours[day],
    day,
  }));

  return (
    <SettingsCard
      title="Opening hours"
      button={
        <IconButton size="small" color="primary">
          <EditOutlined fontSize="small" />
        </IconButton>
      }
    >
      {openingHoursWithDay.map(({ day, end, open, start }) => (
        <Box
          key={day}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography sx={{ textTransform: "capitalize" }}>{day}</Typography>
          <Typography>{open ? `${start} - ${end}` : "Closed"}</Typography>
        </Box>
      ))}
    </SettingsCard>
  );
};

export default OpeningHours;
