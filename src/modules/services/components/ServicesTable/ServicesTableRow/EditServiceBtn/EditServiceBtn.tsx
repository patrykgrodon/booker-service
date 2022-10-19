import { EditOutlined } from "@mui/icons-material";
import { ActionIconButton } from "common/components";
import useModal from "common/hooks/useModal";
import ServiceDialog from "modules/services/components/ServiceDialog/ServiceDialog";
import { Service } from "modules/services/types";

interface EditServiceBtnProps {
  service: Service;
}

const EditServiceBtn = ({ service }: EditServiceBtnProps) => {
  const { isOpen, closeModal, openModal } = useModal();
  const { uuid, ...defaultService } = service;
  return (
    <>
      <ActionIconButton
        onClick={openModal}
        disableTooltipMargin
        enabled
        icon={EditOutlined}
        tooltip="Edit"
      />
      <ServiceDialog
        isOpen={isOpen}
        handleClose={closeModal}
        defaultService={defaultService}
        uuid={uuid}
      />
    </>
  );
};

export default EditServiceBtn;
