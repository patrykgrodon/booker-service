import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Service } from "modules/services/types";
import ServicesTableRow from "./ServicesTableRow/ServicesTableRow";

const headers = ["Name", "Type", "Duration", "Cost", "Actions"];
const services: Service[] = [
  {
    name: "Barber",
    cost: 30,
    duration: "1 hour",
    type: "Hairdresser",
  },
];

const ServicesTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, i) => (
              <TableCell key={header} align={i === 0 ? "left" : "right"}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {services.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12}>
                <Typography variant="subtitle1" color="GrayText" align="center">
                  You haven't added any services yet
                </Typography>
              </TableCell>
            </TableRow>
          ) : null}
          {services.map((service) => (
            <ServicesTableRow key={service.name} service={service} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ServicesTable;
