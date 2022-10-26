import { Box, Typography } from "@mui/material";
import { isEqual } from "date-fns";

interface BookHoursProps {
  availableHours: { asDate: Date; asString: string }[];
  changeVisitDate: (date: Date) => void;
  visitDate: Date | null;
}

const BookHours = ({
  availableHours,
  changeVisitDate,
  visitDate,
}: BookHoursProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignContent: "flex-start",
        gap: 2,
        minHeight: "250px",
        mt: 4,
        justifyContent: "center",
      }}>
      <Typography variant="subtitle1" sx={{ width: "100%" }}>
        Available hours
      </Typography>
      {availableHours.map(({ asDate, asString }) => (
        <Box
          key={asString}
          onClick={() => changeVisitDate(asDate)}
          sx={(theme) => ({
            userSelect: "none",
            padding: theme.spacing(1.5, 2),
            borderRadius: 2,
            border: `1px solid ${theme.palette.grey[200]}`,
            cursor: "pointer",
            backgroundColor: isEqual(asDate, visitDate || 0)
              ? theme.palette.grey[200]
              : undefined,
            "&:hover": {
              backgroundColor: theme.palette.grey[200],
            },
          })}>
          <Typography variant="subtitle2">{asString}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default BookHours;
