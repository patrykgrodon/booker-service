import { Button } from "@mui/material";

import { ServiceFormDialog } from ".";
import { useModal } from "common/hooks";
import useCompanyServices from "../hooks/useCompanyServices";
import { useAuth } from "modules/auth/contexts";

const AddServiceBtn = () => {
  const { user } = useAuth();
  const { isOpen, closeModal, openModal } = useModal();
  const { refetch } = useCompanyServices(user?.id || "", false);

  const onSuccess = () => {
    refetch();
    closeModal();
  };
  return (
    <>
      <Button color="success" onClick={openModal}>
        Add service
      </Button>
      <ServiceFormDialog
        handleClose={closeModal}
        isOpen={isOpen}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default AddServiceBtn;
