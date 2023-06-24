import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Spinner, StickyHeaderTable } from "common/components";
import { useAuth } from "modules/auth/contexts";
import useCompanyVisits from "modules/visits/hooks/useCompanyVisits";
import { VisitsTableTabs } from "modules/visits/pages/Visits";
import VisitsTableRow from "./VisitsTableRow";
import { VisitsFilters } from "modules/visits/hooks/useVisitsFilters";

const headers = ["Start date", "Employee", "Service", "Customer", "Actions"];

type VisitsTableProps = {
  activeTab: VisitsTableTabs;
  filters: VisitsFilters;
};

const VisitsTable = ({ activeTab, filters }: VisitsTableProps) => {
  const { user } = useAuth();

  const { visits, isLoading, isError } = useCompanyVisits(
    user?.id || "",
    filters,
    !!activeTab
  );

  if (isLoading) return <Spinner size="medium" />;
  if (isError)
    return (
      <Typography variant="subtitle1" color="error" align="center">
        Something went wrong... <br /> Refresh page or contact with support
      </Typography>
    );

  return (
    <StickyHeaderTable
      paperProps={{ sx: { borderTopLeftRadius: 0, borderTopRightRadius: 0 } }}
    >
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell key={header}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {visits?.map((visit) => (
          <VisitsTableRow key={visit.id} visit={visit} />
        ))}
      </TableBody>
    </StickyHeaderTable>
  );
};

export default VisitsTable;
