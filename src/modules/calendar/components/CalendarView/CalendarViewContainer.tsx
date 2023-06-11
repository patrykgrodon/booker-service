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
      }}
      children={children}
    />
  );
};

export default CalendarViewContainer;
