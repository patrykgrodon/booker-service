import { TableRow, TableCell } from "@mui/material";
import ActionsCell from "./ActionsCell";
import { Customer } from "modules/customers/types";

type CustomersTableRowProps = {
  customer: Customer;
};

const CustomersTableRow = ({ customer }: CustomersTableRowProps) => {
  return (
    <TableRow>
      <TableCell>
        {customer.firstName} {customer.lastName}
      </TableCell>
      <TableCell>{customer.phoneNumber}</TableCell>
      <TableCell>{customer.email || "---"}</TableCell>
      <ActionsCell customer={customer} />
    </TableRow>
  );
};

export default CustomersTableRow;
