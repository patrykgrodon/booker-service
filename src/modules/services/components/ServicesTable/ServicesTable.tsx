import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ServicesTableRow from "./ServicesTableRow";

const headers = ["Name", "Duration", "Cost", "Actions"];

const services = [
  {
    id: "1",
    name: "Infill nails (1 colour)",
    duration: "01:00",
    cost: 30,
  },
];

const ServicesTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service) => (
            <ServicesTableRow key={service.name} service={service} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ServicesTable;
