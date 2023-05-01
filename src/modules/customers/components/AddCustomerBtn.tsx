import { Button } from "@mui/material";

import { CustomerFormDialog } from ".";
import { useModal } from "common/hooks";
import useCompanyCustomers from "../hooks/useCompanyCustomers";
import { useAuth } from "modules/auth/contexts";

const AddCustomerBtn = () => {
  const { user } = useAuth();
  const { isOpen, closeModal, openModal } = useModal();
  const { refetch } = useCompanyCustomers(user?.id || "", false);

  const onSuccess = () => {
    refetch();
    closeModal();
  };
  return (
    <>
      <Button color="success" onClick={openModal}>
        Add customer
      </Button>
      <CustomerFormDialog
        handleClose={closeModal}
        isOpen={isOpen}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default AddCustomerBtn;
