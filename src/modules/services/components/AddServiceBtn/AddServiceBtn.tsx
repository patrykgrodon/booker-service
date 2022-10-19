import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import useModal from "common/hooks/useModal";
import ServiceDialog from "../ServiceDialog/ServiceDialog";

const AddServiceBtn = () => {
  const { isOpen, closeModal, openModal } = useModal();
  return (
    <>
      <Button
        onClick={openModal}
        color="success"
        sx={{ display: "flex", alignItems: "center" }}>
        <Add />
        <b>Add service</b>
      </Button>
      <ServiceDialog isOpen={isOpen} handleClose={closeModal} />
    </>
  );
};

export default AddServiceBtn;
