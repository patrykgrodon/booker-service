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
import { useServices } from "modules/services/contexts/servicesContext";
import ServicesTableRow from "./ServicesTableRow/ServicesTableRow";

const headers = ["Name", "Type", "Duration", "Cost", "Actions"];

const ServicesTable = () => {
  const { myServices } = useServices();
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
          {myServices?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12}>
                <Typography variant="subtitle1" color="GrayText" align="center">
                  You haven't added any services yet
                </Typography>
              </TableCell>
            </TableRow>
          ) : null}
          {myServices?.map((service) => (
            <ServicesTableRow key={service.name} service={service} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ServicesTable;
