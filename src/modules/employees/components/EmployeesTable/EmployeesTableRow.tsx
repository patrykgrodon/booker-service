import { TableRow, TableCell } from "@mui/material";

import ActionsCell from "./ActionsCell";
import { Employee } from "modules/employees/types";

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
      <ActionsCell employee={employee} />
    </TableRow>
  );
};

export default EmployeesTableRow;
