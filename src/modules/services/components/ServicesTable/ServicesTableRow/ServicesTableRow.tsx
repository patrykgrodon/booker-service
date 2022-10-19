import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import { TableCell, TableRow } from "@mui/material";
import { ActionIconButton } from "common/components";
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
        <ActionIconButton
          disableTooltipMargin
          enabled
          icon={EditOutlined}
          tooltip="Edit"
        />
        <ActionIconButton
          disableTooltipMargin
          enabled
          icon={DeleteForeverOutlined}
          tooltip="Delete"
        />
      </TableCell>
    </TableRow>
  );
};

export default ServicesTableRow;
