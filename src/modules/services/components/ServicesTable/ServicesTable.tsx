import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const headers = ["Name", "Duration", "Cost", "Actions"];

const ServicesTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, i) => (
              <TableCell align={i === 0 ? "left" : "right"}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Barber</TableCell>
            <TableCell align="right">1 hour</TableCell>
            <TableCell align="right">10 Euro</TableCell>
            <TableCell align="right">Delete, edit</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ServicesTable;
