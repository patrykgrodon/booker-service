import useModal from "common/hooks/useModal";
import BookServiceDialog from "modules/services/components/BookServiceDialog/BookServiceDialog";
import { Service } from "modules/services/types";
import { Button } from "@mui/material";

interface BookServiceBtnProps {
  service: Service;
}

const BookServiceBtn = ({ service }: BookServiceBtnProps) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Button onClick={openModal} variant="text">
        Book
      </Button>
      {isOpen && (
        <BookServiceDialog
          isOpen={isOpen}
          handleClose={closeModal}
          service={service}
        />
      )}
    </>
  );
};

export default BookServiceBtn;
