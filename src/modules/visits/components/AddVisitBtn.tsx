import { Button } from "@mui/material";

import { useModal } from "common/hooks";
import VisitFormDialog from "./VisitFormDialog";

const AddVisitBtn = () => {
  const { openModal, isOpen, closeModal } = useModal();

  const onSuccess = () => {
    closeModal();
  };

  return (
    <>
      <Button color="success" onClick={openModal}>
        Add visit
      </Button>
      <VisitFormDialog
        handleClose={closeModal}
        isOpen={isOpen}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default AddVisitBtn;
