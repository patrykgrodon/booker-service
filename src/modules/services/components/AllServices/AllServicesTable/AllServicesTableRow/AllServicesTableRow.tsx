import { Box, TableCell, TableRow } from "@mui/material";

import { makeSx } from "common/styles/makeSx";

import { Service } from "modules/services/types";
import BookServiceBtn from "./BookServiceBtn/BookServiceBtn";

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
        <Box
          sx={{
            minWidth: "max-content",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}>
          {cost} €
        </Box>
      </TableCell>
      <TableCell sx={sxTableCell} align="right">
        <BookServiceBtn service={service} />
      </TableCell>
    </TableRow>
  );
};

export default AllServicesTableRow;
