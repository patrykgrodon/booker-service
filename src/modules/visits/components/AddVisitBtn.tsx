import { Button } from "@mui/material";
import { useModal } from "common/hooks";

const AddVisitBtn = () => {
  const { openModal } = useModal();
  return (
    <>
      <Button color="success" onClick={openModal}>
        Add visit
      </Button>
    </>
  );
};

export default AddVisitBtn;
