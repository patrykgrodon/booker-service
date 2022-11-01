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
import AllServicesTableRow from "./AllServicesTableRow/AllServicesTableRow";
import AllServicesTableSkeleton from "./AllServicesTableRow/AllServicesTableSkeleton";

const headers = [
  "Service name",
  "Company name",
  "City",
  "Type",
  "Duration",
  "Cost",
  "Actions",
];

const AllServicesTable = () => {
  const { allServices, isLoading } = useServices();

  if (isLoading) return <AllServicesTableSkeleton />;

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
          {allServices?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12}>
                <Typography variant="subtitle1" color="GrayText" align="center">
                  None add service yet
                </Typography>
              </TableCell>
            </TableRow>
          ) : null}
          {allServices?.map((service) => (
            <AllServicesTableRow key={service.id} service={service} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllServicesTable;
