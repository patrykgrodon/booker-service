import {
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import CustomersTableRow from "./CustomersTableRow";
import { useAuth } from "modules/auth/contexts";
import useCompanyCustomers from "modules/customers/hooks/useCompanyCustomers";
import { Spinner, StickyHeaderTable } from "common/components";

const headers = ["Full name", "Phone number", "E-mail", "Actions"];

const CustomersTable = () => {
  const { user } = useAuth();
  const { customers, isLoading, isError } = useCompanyCustomers(user?.id || "");

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
        {customers?.map((customer) => (
          <CustomersTableRow key={customer.id} customer={customer} />
        ))}
      </TableBody>
    </StickyHeaderTable>
  );
};

export default CustomersTable;
