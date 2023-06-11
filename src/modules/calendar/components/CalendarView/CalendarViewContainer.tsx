import { Box } from "@mui/material";
import React from "react";

const CalendarViewContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        height: "100%",
        "& .rbc-off-range-bg": {
          backgroundColor: (theme) => theme.palette.action.disabledBackground,
        },
        "& .rbc-today": {
          backgroundColor: (theme) => theme.palette.action.disabled,
        },
        "& .rbc-calendar": {
          fontFamily: "Lato, Segoe UI, sans-serif",
        },

        "& .rbc-show-more": {
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "5px",
        },

        "& .rbc-continues-after::after": {
          display: "none",
        },
        "& .rbc-continues-after::before": {
          display: "none",
        },

        "& .rbc-agenda-event-cell": {
          width: "auto",
        },
        "& .rbc-allday-cell": {
          display: "none",
        },
        "& .rbc-time-content ": {
          borderTop: "none",
        },
        "& .rbc-time-header ": {
          borderBottom: "none",
        },
      }}
      children={children}
    />
  );
};

export default CalendarViewContainer;
