import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useAuth } from "modules/auth/contexts";
import ServicesTableRow from "./ServicesTableRow";

import { Spinner, StickyHeaderTable } from "common/components";
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
    <StickyHeaderTable>
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
    </StickyHeaderTable>
  );
};

export default ServicesTable;
