import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import CustomersTableRow from "./CustomersTableRow";

const headers = ["Full name", "Phone number", "E-mail", "Actions"];

const CustomersTable = () => {
  return (
    <TableContainer
      sx={{
        flex: 1,
        overflow: "auto",
      }}
    >
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <CustomersTableRow />
          </TableBody>
        </Table>
      </Paper>
    </TableContainer>
  );
};

export default CustomersTable;
