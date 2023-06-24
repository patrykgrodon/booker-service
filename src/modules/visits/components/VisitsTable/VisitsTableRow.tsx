import { TableCell, TableRow } from "@mui/material";
import { dashedDateTimeFormat } from "common/utils/dateTimeUtils";
import { format } from "date-fns";
import { Visit } from "modules/visits/types";
import ActionsCell from "./ActionsCell";

type VisitsTableRowProps = {
  visit: Visit;
};

const VisitsTableRow = ({ visit }: VisitsTableRowProps) => {
  const { customer, startAt, employee, service } = visit;
  return (
    <TableRow>
      <TableCell sx={{ maxWidth: "130px", width: "130px" }}>
        {format(startAt, dashedDateTimeFormat)}
      </TableCell>
      <TableCell>
        {employee ? `${employee.firstName} ${employee.lastName}` : "Deleted"}
      </TableCell>
      <TableCell>{service ? service.name : "Deleted"}</TableCell>
      <TableCell>
        {customer ? `${customer.firstName} ${customer.lastName}` : "Deleted"}
      </TableCell>
      <ActionsCell visit={visit} />
    </TableRow>
  );
};

export default VisitsTableRow;
