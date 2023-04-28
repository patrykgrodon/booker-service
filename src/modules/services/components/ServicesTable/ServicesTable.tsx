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

import { useAuth } from "modules/auth/contexts";
import ServicesTableRow from "./ServicesTableRow";

import { Spinner } from "common/components";
import useCompanyServices from "modules/services/hooks/useCompanyServices";

const headers = ["Name", "Duration", "Cost", "Actions"];

const ServicesTable = () => {
  const { user } = useAuth();
  const { services, isLoading, isError } = useCompanyServices(user?.id || "");

  if (isLoading) return <Spinner size="medium" />;
  if (isError)
    return (
      <Typography variant="subtitle1" color="error" align="center">
        Something went wrong... <br /> Refresh page or contact with support
      </Typography>
    );

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
          {services?.map((service) => (
            <ServicesTableRow key={service.name} service={service} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ServicesTable;
