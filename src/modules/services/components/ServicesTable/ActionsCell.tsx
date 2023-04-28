import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import { TableCell, IconButton } from "@mui/material";
import { useModal } from "common/hooks";
import { Service } from "modules/services/types";
import { ServiceFormDialog } from "..";
import useCompanyServices from "modules/services/hooks/useCompanyServices";

type ActionsCellProps = {
  service: Service;
};

const ActionsCell = ({ service }: ActionsCellProps) => {
  const { refetch } = useCompanyServices(service.companyId, false);

  const {
    isOpen: isEditOpen,
    closeModal: closeEdit,
    openModal: openEdit,
  } = useModal();

  const onSuccess = () => {
    closeEdit();
    refetch();
  };
  return (
    <>
      <TableCell sx={{ width: "100px", minWidth: "100px" }}>
        <IconButton size="small" sx={{ mr: 1 }} onClick={openEdit}>
          <EditOutlined fontSize="small" />
        </IconButton>
        <IconButton size="small">
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
    </>
  );
};

export default ActionsCell;
