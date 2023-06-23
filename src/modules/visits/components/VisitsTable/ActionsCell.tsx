import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import { TableCell, IconButton } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import { useModal } from "common/hooks";
import { Visit } from "modules/visits/types";
import VisitFormDialog from "../VisitFormDialog";
import { useAuth } from "modules/auth/contexts";
import { DeleteVisitConfirmationDialog } from "..";
import { queryKeys } from "common/utils/queryKeys";

type ActionsCellProps = {
  visit: Visit;
};

const ActionsCell = ({ visit }: ActionsCellProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

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
    queryClient.invalidateQueries(queryKeys.companyVisits(user?.id || ""));

  const onSuccess = () => {
    closeEdit();
    refetchVisits();
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
      <DeleteVisitConfirmationDialog
        handleClose={closeDelete}
        isOpen={isDeleteOpen}
        onDeleteSuccess={refetchVisits}
        visitId={visit.id}
      />
    </>
  );
};

export default ActionsCell;
