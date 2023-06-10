import { Button } from "@mui/material";

import { useModal } from "common/hooks";
import VisitFormDialog from "./VisitFormDialog";
import { useAuth } from "modules/auth/contexts";
import { useQueryClient } from "@tanstack/react-query";

const AddVisitBtn = () => {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { openModal, isOpen, closeModal } = useModal();

  const onSuccess = () => {
    queryClient.invalidateQueries(["visits", user?.id]);
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
