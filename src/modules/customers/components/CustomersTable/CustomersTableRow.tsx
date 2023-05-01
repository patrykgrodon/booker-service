import { TableRow, TableCell } from "@mui/material";
import ActionsCell from "./ActionsCell";

const CustomersTableRow = () => {
  return (
    <TableRow>
      <TableCell>Patryk Grodoń</TableCell>
      <TableCell>530559676</TableCell>
      <TableCell>patrykgrodon@wp.pl</TableCell>
      <ActionsCell />
    </TableRow>
  );
};

export default CustomersTableRow;
