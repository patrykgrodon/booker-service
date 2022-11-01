import { useCallback, useState } from "react";

export type UseModalReturn = {
  isOpen: boolean;
  openModal: () => void;
  toggleModal: () => void;
  closeModal: () => void;
};

const useModal = (initState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initState);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, openModal, toggleModal, closeModal };
};

export default useModal;
