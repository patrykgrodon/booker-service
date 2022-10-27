import { Box, Typography } from "@mui/material";
import { format, isEqual } from "date-fns";

interface BookDayProps {
  day: Date;
  changeCurrentDay: () => void;
  currentDay: Date;
}

const BookDay = ({ day, changeCurrentDay, currentDay }: BookDayProps) => {
  //   console.log(day, currentDay);
  return (
    <Box
      onClick={changeCurrentDay}
      sx={(theme) => ({
        userSelect: "none",
        cursor: "pointer",
        borderRadius: 1,
        border: `1px solid ${theme.palette.grey[200]}`,
        p: theme.spacing(1.5, 2, 0.5, 2),
        position: "relative",
        transition: ".3s all",
        backgroundColor: isEqual(day, currentDay)
          ? theme.palette.grey[200]
          : undefined,
        "&:hover": {
          backgroundColor: theme.palette.grey[200],
        },
      })}>
      <Typography
        variant="subtitle2"
        align="center"
        sx={{
          position: "absolute",
          left: "50%",
          top: "-20%",
          transform: "translate(-50%, -50%)",
        }}>
        {format(day, "MMM").slice(0, 3)}
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ fontSize: 20 }}>
        {format(day, "dd")}
      </Typography>
      <Typography variant="subtitle2" align="center">
        {format(day, "eeee").slice(0, 3)}
      </Typography>
    </Box>
  );
};

export default BookDay;
