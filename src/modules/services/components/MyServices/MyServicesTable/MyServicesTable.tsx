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
import MyServicesTableRow from "./MyServicesTableRorw/MyServicesTableRow";
import MyServicesTableSkeleton from "./MyServicesTableSkeleton";

const headers = ["Name", "Type", "Duration", "Cost", "Actions"];

const MyServicesTable = () => {
  const { myServices, isLoading } = useServices();

  if (isLoading) return <MyServicesTableSkeleton />;

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
            <MyServicesTableRow key={service.name} service={service} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyServicesTable;
