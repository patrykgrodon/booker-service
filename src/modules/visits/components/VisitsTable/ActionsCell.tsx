import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import { TableCell, IconButton } from "@mui/material";
import { useState } from "react";

import { useModal } from "common/hooks";
import { Visit } from "modules/visits/types";
import { ConfirmationDialog } from "common/components";
import { useToast } from "common/providers/ToastProvider";
import VisitFormDialog from "../VisitFormDialog";
import { deleteVisit } from "modules/visits/api";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "modules/auth/contexts";

type ActionsCellProps = {
  visit: Visit;
};

const ActionsCell = ({ visit }: ActionsCellProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

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

  const refetchVisits = () =>
    queryClient.invalidateQueries(["visits", user?.id]);

  const onSuccess = () => {
    closeEdit();
    refetchVisits();
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteVisit(visit.id);
      refetchVisits();
    } catch (err: any) {
      setErrorMessage("Error while deleteting visit. Try again!");
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
      <VisitFormDialog
        handleClose={closeEdit}
        isOpen={isEditOpen}
        onSuccess={onSuccess}
        formValues={{
          customer: visit.customer.id,
          date: visit.startAt,
          employee: visit.employee.id,
          service: visit.service.id,
        }}
        id={visit.id}
      />
      <ConfirmationDialog
        title="Delete visit"
        text="Are you sure that you want to delete the visit?"
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
