import {
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import EmployeesTableRow from "./EmployeesTableRow";
import { useAuth } from "modules/auth/contexts";
import useCompanyEmployees from "modules/employees/hooks/useCompanyEmployees";
import { Spinner, StickyHeaderTable } from "common/components";

const headers = [
  "Full name",
  "Phone number",
  "E-mail",
  "Calendar color",
  "Actions",
];

const EmployeesTable = () => {
  const { user } = useAuth();
  const { employees, isLoading, isError } = useCompanyEmployees(user?.id || "");

  if (isLoading) return <Spinner size="medium" />;
  if (isError)
    return (
      <Typography variant="subtitle1" color="error" align="center">
        Something went wrong... <br /> Refresh page or contact with support
      </Typography>
    );

  return (
    <StickyHeaderTable>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell key={header}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {employees?.map((employee) => (
          <EmployeesTableRow key={employee.id} employee={employee} />
        ))}
        {employees?.map((employee) => (
          <EmployeesTableRow key={employee.id} employee={employee} />
        ))}
        {employees?.map((employee) => (
          <EmployeesTableRow key={employee.id} employee={employee} />
        ))}
        {employees?.map((employee) => (
          <EmployeesTableRow key={employee.id} employee={employee} />
        ))}
        {employees?.map((employee) => (
          <EmployeesTableRow key={employee.id} employee={employee} />
        ))}
        {employees?.map((employee) => (
          <EmployeesTableRow key={employee.id} employee={employee} />
        ))}
        {employees?.map((employee) => (
          <EmployeesTableRow key={employee.id} employee={employee} />
        ))}
        {employees?.map((employee) => (
          <EmployeesTableRow key={employee.id} employee={employee} />
        ))}
        {employees?.map((employee) => (
          <EmployeesTableRow key={employee.id} employee={employee} />
        ))}
        {employees?.map((employee) => (
          <EmployeesTableRow key={employee.id} employee={employee} />
        ))}
      </TableBody>
    </StickyHeaderTable>
  );
};

export default EmployeesTable;
