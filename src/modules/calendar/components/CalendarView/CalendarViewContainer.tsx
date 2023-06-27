import { Box } from "@mui/material";
import React from "react";
import { View } from "react-big-calendar";

const CalendarViewContainer = ({
  children,
  view,
}: {
  children: React.ReactNode;
  view: View;
}) => {
  return (
    <Box
      sx={{
        height: "100%",
        maxHeight: "100%",
        overflow: "auto",
        "& .rbc-off-range-bg": {
          backgroundColor: (theme) =>
            `${theme.palette.action.disabledBackground} !important`,
        },
        "& .rbc-selected-cell": {
          backgroundColor: "unset",
        },
        "& .rbc-slot-selection": {
          display: "none",
        },
        "& .rbc-slot-selecting": {
          cursor: "default",
        },
        "& .rbc-today": {
          backgroundColor: (theme) =>
            view === "day" ? "transparent" : theme.palette.action.disabled,
        },
        "& .rbc-calendar": {
          fontFamily: "Lato, Segoe UI, sans-serif",
        },

        "& .rbc-show-more": {
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "5px",
          background: "transparent",
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
        "& .rbc-time-header": {
          borderBottom: "none",
        },
        "& .rbc-btn-group": {
          "& .rbc-active, .rbc-active:hover, button:hover": {
            color: (theme) => theme.palette.common.black,
          },
          "& button": {
            color: (theme) => theme.palette.text.primary,
          },
        },
        "& .rbc-toolbar": {
          flexDirection: { xs: "column", md: "row" },
          rowGap: 1,
          "& .rbc-toolbar-label": {
            order: { xs: -1, md: 0 },
          },
          "& .rbc-btn-group": {
            display: { xs: "flex", md: "inline-block" },
            width: { xs: "100%", md: "max-content" },

            "& button": {
              flex: { xs: "1 1 0px" },
            },
          },
        },
      }}
      children={children}
    />
  );
};

export default CalendarViewContainer;
