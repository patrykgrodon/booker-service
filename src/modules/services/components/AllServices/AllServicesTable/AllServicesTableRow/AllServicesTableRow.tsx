import { Button, TableCell, TableRow } from "@mui/material";
import { makeSx } from "common/styles/makeSx";
import { Service } from "modules/services/types";

interface AllServicesTableRowProps {
  service: Service;
}

const sxTableCell = makeSx((theme) => ({
  fontSize: theme.typography.subtitle1.fontSize,
}));

const AllServicesTableRow = ({ service }: AllServicesTableRowProps) => {
  const { name, type, duration, cost, city, companyName } = service;
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
        <Button variant="text">Book</Button>
      </TableCell>
    </TableRow>
  );
};

export default AllServicesTableRow;
