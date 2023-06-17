import { Box } from "@mui/material";

type CalendarColorDotProps = {
  color: string;
};

const CalendarColorDot = ({ color }: CalendarColorDotProps) => {
  return (
    <Box
      sx={{
        width: "15px",
        aspectRatio: "1 / 1",
        backgroundColor: color,
        borderRadius: "50%",
      }}
    ></Box>
  );
};

export default CalendarColorDot;
