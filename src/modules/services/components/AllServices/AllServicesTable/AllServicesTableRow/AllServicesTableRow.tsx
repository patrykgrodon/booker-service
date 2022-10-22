import { TableCell, TableRow } from "@mui/material";
import { RequestButton } from "common/components";
import { Visit, useVisits } from "common/providers/VisitsProvider";
import { makeSx } from "common/styles/makeSx";
import { useAuth } from "modules/auth/contexts/authContext";
import { Service } from "modules/services/types";
import { useState } from "react";

interface AllServicesTableRowProps {
  service: Service;
}

const sxTableCell = makeSx((theme) => ({
  fontSize: theme.typography.subtitle1.fontSize,
}));

const AllServicesTableRow = ({ service }: AllServicesTableRowProps) => {
  const { name, type, duration, cost, city, companyName } = service;
  const { user } = useAuth();
  const { addVisit } = useVisits();

  const [isLoading, setIsLoading] = useState(false);

  const handleBookVisit = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const visit: Visit = {
        service,
        date: new Date(),
        customerId: user.id,
      };
      await addVisit(visit);
    } catch (err: any) {}
    setIsLoading(false);
  };

  return (
    <TableRow>
      <TableCell sx={sxTableCell}>{name}</TableCell>
      <TableCell sx={sxTableCell} align="right">
        {companyName}
      </TableCell>
      <TableCell sx={sxTableCell} align="right">
        {city}
      </TableCell>
      <TableCell sx={sxTableCell} align="right">
        {type}
      </TableCell>
      <TableCell sx={sxTableCell} align="right">
        {duration}
      </TableCell>
      <TableCell sx={sxTableCell} align="right">
        {cost} €
      </TableCell>
      <TableCell sx={sxTableCell} align="right">
        <RequestButton
          onClick={handleBookVisit}
          isLoading={isLoading}
          variant="text">
          Book
        </RequestButton>
      </TableCell>
    </TableRow>
  );
};

export default AllServicesTableRow;
