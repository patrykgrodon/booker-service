import { Box } from "@mui/material";
import { addDays, startOfDay } from "date-fns";
import BookDay from "./BookDay/BookDay";

interface BookDaysProps {
  currentDay: Date;
  changeCurrentDay: (date: Date) => void;
}

const BookDays = ({ currentDay, changeCurrentDay }: BookDaysProps) => {
  const getNext7Days = () => {
    let next7Days: Date[] = [];
    let d = startOfDay(new Date());
    for (let i = 0; i < 7; i++) {
      next7Days.push(d);
      d = addDays(d, 1);
    }
    return next7Days;
  };
  return (
    <Box
      sx={{
        display: "flex",
        columnGap: 2,
      }}>
      {getNext7Days().map((day, i) => (
        <BookDay
          key={i}
          changeCurrentDay={() => changeCurrentDay(day)}
          currentDay={currentDay}
          day={day}
        />
      ))}
    </Box>
  );
};

export default BookDays;
