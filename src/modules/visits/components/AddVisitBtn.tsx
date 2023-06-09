import { Button } from "@mui/material";

import { useModal } from "common/hooks";
import VisitFormDialog from "./VisitFormDialog";
import { useAuth } from "modules/auth/contexts";
import useCompanyVisits from "../hooks/useCompanyVisits";

const AddVisitBtn = () => {
  const { user } = useAuth();

  const { refetch } = useCompanyVisits(user?.id || "", false);

  const { openModal, isOpen, closeModal } = useModal();

  const onSuccess = () => {
    refetch();
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
