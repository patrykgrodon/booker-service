import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import { TableCell, IconButton } from "@mui/material";
import { useState } from "react";

import { useModal } from "common/hooks";
import { Employee } from "modules/employees/types";
import { EmployeeFormDialog } from "..";
import useCompanyEmployee from "modules/employees/hooks/useCompanyEmployees";
import { ConfirmationDialog } from "common/components";
import { useToast } from "common/providers/ToastProvider";
import { deleteEmployee } from "modules/employees/api";

type ActionsCellProps = {
  employee: Employee;
};

const ActionsCell = ({ employee }: ActionsCellProps) => {
  const { refetch } = useCompanyEmployee(employee.companyId, false);
  const { setErrorMessage } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    isOpen: isEditOpen,
    closeModal: closeEdit,
    openModal: openEdit,
  } = useModal();
  const {
    isOpen: isDeleteOpen,
    closeModal: closeDelete,
    openModal: openDelete,
  } = useModal();

  const onSuccess = () => {
    closeEdit();
    refetch();
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteEmployee(employee.id);
      refetch();
    } catch (err: any) {
      setErrorMessage("Error while deleteting employee. Try again!");
    }
    setIsLoading(false);
  };
  return (
    <>
      <TableCell sx={{ width: "100px", minWidth: "100px" }}>
        <IconButton size="small" sx={{ mr: 1 }} onClick={openEdit}>
          <EditOutlined fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={openDelete}>
          <DeleteForeverOutlined fontSize="small" />
        </IconButton>
      </TableCell>
      <EmployeeFormDialog
        handleClose={closeEdit}
        isOpen={isEditOpen}
        onSuccess={onSuccess}
        formValues={{
          firstName: employee.firstName,
          lastName: employee.lastName,
          phoneNumber: employee.phoneNumber,
          email: employee.email,
        }}
        id={employee.id}
      />
      <ConfirmationDialog
        title="Delete employee"
        text="Are you sure that you want to delete the employee?"
        mainButtonText="Delete"
        type="error"
        open={isDeleteOpen}
        isLoading={isLoading}
        handleClick={handleDelete}
        handleClose={closeDelete}
      />
    </>
  );
};

export default ActionsCell;
