import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import { TableCell, IconButton } from "@mui/material";
import { useModal } from "common/hooks";
import { Service } from "modules/services/types";
import { ServiceFormDialog } from "..";
import useCompanyServices from "modules/services/hooks/useCompanyServices";
import { ConfirmationDialog } from "common/components";
import useServices from "modules/services/hooks/useServices";
import { useState } from "react";
import { useToast } from "common/providers/ToastProvider";

type ActionsCellProps = {
  service: Service;
};

const ActionsCell = ({ service }: ActionsCellProps) => {
  const { refetch } = useCompanyServices(service.companyId, false);
  const { deleteService } = useServices();
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
      await deleteService(service.id);
      refetch();
    } catch (err: any) {
      setErrorMessage("Error while deleteting service. Try again!");
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
      <ServiceFormDialog
        handleClose={closeEdit}
        isOpen={isEditOpen}
        onSuccess={onSuccess}
        formValues={{
          cost: service.cost,
          duration: service.duration,
          name: service.name,
        }}
        id={service.id}
      />
      <ConfirmationDialog
        title="Delete service"
        text="Are you sure that you want to delete the service?"
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
