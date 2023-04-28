import { TableCell, TableRow } from "@mui/material";

import { Service } from "modules/services/types";
import ActionsCell from "./ActionsCell";

type ServicesTableRowProps = {
  service: Service;
};

const ServicesTableRow = ({ service }: ServicesTableRowProps) => {
  return (
    <TableRow>
      <TableCell>{service.name}</TableCell>
      <TableCell>{service.duration}</TableCell>
      <TableCell>{service.cost} $</TableCell>
      <ActionsCell service={service} />
    </TableRow>
  );
};

export default ServicesTableRow;
