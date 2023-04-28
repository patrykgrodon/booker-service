import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import { TableCell, TableRow, IconButton } from "@mui/material";

import { Service } from "modules/services/types";

type ServicesTableRowProps = {
  service: Service;
};

const ServicesTableRow = ({ service }: ServicesTableRowProps) => {
  return (
    <TableRow>
      <TableCell>{service.name}</TableCell>
      <TableCell>{service.duration}</TableCell>
      <TableCell>{service.cost} $</TableCell>
      <TableCell sx={{ width: "100px", minWidth: "100px" }}>
        <IconButton size="small" sx={{ mr: 1 }}>
          <EditOutlined fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <DeleteForeverOutlined fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ServicesTableRow;
