import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import { TableCell, IconButton } from "@mui/material";
import { useState } from "react";

import { useModal } from "common/hooks";
import { Customer } from "modules/customers/types";
import { CustomerFormDialog } from "..";
import useCompanyCustomer from "modules/customers/hooks/useCompanyCustomers";
import { ConfirmationDialog } from "common/components";
import useCustomers from "modules/customers/hooks/useCustomers";
import { useToast } from "common/providers/ToastProvider";

type ActionsCellProps = {
  customer: Customer;
};

const ActionsCell = ({ customer }: ActionsCellProps) => {
  const { refetch } = useCompanyCustomer(customer.companyId, false);
  const { deleteCustomer } = useCustomers();
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
      await deleteCustomer(customer.id);
      refetch();
    } catch (err: any) {
      setErrorMessage("Error while deleteting customer. Try again!");
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
      <CustomerFormDialog
        handleClose={closeEdit}
        isOpen={isEditOpen}
        onSuccess={onSuccess}
        formValues={{
          firstName: customer.firstName,
          lastName: customer.lastName,
          phoneNumber: customer.phoneNumber,
          email: customer.email,
        }}
        id={customer.id}
      />
      <ConfirmationDialog
        title="Delete customer"
        text="Are you sure that you want to delete the customer?"
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
