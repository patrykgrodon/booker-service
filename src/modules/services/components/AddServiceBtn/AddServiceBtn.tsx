import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

const AddServiceBtn = () => {
  return (
    <Button color="success" sx={{ display: "flex", alignItems: "center" }}>
      <Add />
      <b>Add service</b>
    </Button>
  );
};

export default AddServiceBtn;
