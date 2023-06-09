import { TableCell, TableRow, Typography } from "@mui/material";
import { dashedDateTimeFormat } from "common/utils/dateTimeUtils";
import { format } from "date-fns";
import { Visit } from "modules/visits/types";

type VisitsTableRowProps = {
  visit: Visit;
};

const VisitsTableRow = ({ visit }: VisitsTableRowProps) => {
  const { customer, date, employee, service } = visit;
  return (
    <TableRow>
      <TableCell>
        <Typography sx={{ maxWidth: "125px", lineHeight: 1.2 }}>
          {format(date, dashedDateTimeFormat)}
        </Typography>
      </TableCell>
      <TableCell>
        {employee.firstName} {employee.lastName}
      </TableCell>
      <TableCell>{service.name}</TableCell>
      <TableCell>
        {customer.firstName} {customer.lastName}
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default VisitsTableRow;
