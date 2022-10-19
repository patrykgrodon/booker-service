import { TableCell, TableRow } from "@mui/material";
import { makeSx } from "common/styles/makeSx";
import { Service } from "modules/services/types";

interface ServicesTableRowProps {
  service: Service;
}

const sxTableCell = makeSx((theme) => ({
  fontSize: theme.typography.subtitle1.fontSize,
}));

const ServicesTableRow = ({ service }: ServicesTableRowProps) => {
  const { cost, duration, name, type } = service;
  return (
    <TableRow>
      <TableCell sx={sxTableCell}>{name}</TableCell>
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
        Delete, edit
      </TableCell>
    </TableRow>
  );
};

export default ServicesTableRow;
