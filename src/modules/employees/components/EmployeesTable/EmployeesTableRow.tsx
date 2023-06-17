import { TableRow, TableCell, Box } from "@mui/material";

import ActionsCell from "./ActionsCell";
import { Employee } from "modules/employees/types";
import { CalendarColorDot } from "modules/calendar/components";

type EmployeesTableRowProps = {
  employee: Employee;
};

const EmployeesTableRow = ({ employee }: EmployeesTableRowProps) => {
  return (
    <TableRow>
      <TableCell>
        {employee.firstName} {employee.lastName}
      </TableCell>
      <TableCell>{employee.phoneNumber}</TableCell>
      <TableCell>{employee.email || "---"}</TableCell>
      <TableCell>
        <Box sx={{ ml: 4.5 }}>
          <CalendarColorDot color={employee.calendarColor} />
        </Box>
      </TableCell>
      <ActionsCell employee={employee} />
    </TableRow>
  );
};

export default EmployeesTableRow;
