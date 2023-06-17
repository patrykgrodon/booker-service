import {
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";

import VisitsTableRow from "./VisitsTableRow";
import { useAuth } from "modules/auth/contexts";
import { Spinner, StickyHeaderTable } from "common/components";
import useCompanyVisits from "modules/visits/hooks/useCompanyVisits";
import { VisitsTableTabs } from "modules/visits/pages/Visits";

const headers = ["Start date", "Employee", "Service", "Customer", "Actions"];

type VisitsTableProps = {
  activeTab: VisitsTableTabs;
};

const VisitsTable = ({ activeTab }: VisitsTableProps) => {
  const { user } = useAuth();

  const { visits, isLoading, isError } = useCompanyVisits(
    user?.id || "",
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
    <StickyHeaderTable>
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
