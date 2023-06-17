import { Box, SxProps } from "@mui/material";

type CalendarColorDotProps = {
  color: string;
  sx?: SxProps;
};

const CalendarColorDot = ({ color, sx }: CalendarColorDotProps) => {
  return (
    <Box
      sx={{
        width: "15px",
        aspectRatio: "1 / 1",
        backgroundColor: color,
        borderRadius: "50%",
        ...sx,
      }}
    ></Box>
  );
};

export default CalendarColorDot;
