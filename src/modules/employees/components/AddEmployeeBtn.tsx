import { Button } from "@mui/material";

import { EmployeeFormDialog } from ".";
import { useModal } from "common/hooks";
import useCompanyEmployees from "../hooks/useCompanyEmployees";
import { useAuth } from "modules/auth/contexts";

const AddEmployeeBtn = () => {
  const { user } = useAuth();
  const { isOpen, closeModal, openModal } = useModal();
  const { refetch } = useCompanyEmployees(user?.id || "", false);

  const onSuccess = () => {
    refetch();
    closeModal();
  };
  return (
    <>
      <Button color="success" onClick={openModal}>
        Add employee
      </Button>
      <EmployeeFormDialog
        handleClose={closeModal}
        isOpen={isOpen}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default AddEmployeeBtn;
