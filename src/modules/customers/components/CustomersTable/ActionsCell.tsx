import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import { IconButton, TableCell } from "@mui/material";

const ActionsCell = () => {
  return (
    <TableCell sx={{ width: "100px", minWidth: "100px" }}>
      <IconButton size="small" sx={{ mr: 1 }}>
        <EditOutlined fontSize="small" />
      </IconButton>
      <IconButton size="small">
        <DeleteForeverOutlined fontSize="small" />
      </IconButton>
    </TableCell>
  );
};

export default ActionsCell;
