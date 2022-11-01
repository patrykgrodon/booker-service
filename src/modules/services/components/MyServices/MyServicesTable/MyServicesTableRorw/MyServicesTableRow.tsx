import { DeleteForeverOutlined } from "@mui/icons-material";
import { Box, TableCell, TableRow } from "@mui/material";
import { ActionIconButton } from "common/components";
import { makeSx } from "common/styles/makeSx";
import { useServices } from "modules/services/contexts/servicesContext";
import { Service } from "modules/services/types";
import { useState } from "react";
import EditServiceBtn from "./EditServiceBtn/EditServiceBtn";

interface MyServicesTableRowProps {
  service: Service;
}

const sxTableCell = makeSx((theme) => ({
  fontSize: theme.typography.subtitle1.fontSize,
}));

const MyServicesTableRow = ({ service }: MyServicesTableRowProps) => {
  const { deleteService, refetch } = useServices();
  const [isLoading, setIsLoading] = useState(false);
  const { cost, duration, name, type, id } = service;

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteService(id);
      refetch();
    } catch (err: any) {}
    setIsLoading(false);
  };

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
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
          <EditServiceBtn service={service} />
          <ActionIconButton
            isLoading={isLoading}
            onClick={handleDelete}
            disableTooltipMargin
            enabled
            icon={DeleteForeverOutlined}
            tooltip="Delete"
          />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default MyServicesTableRow;
