import { useState } from "react";

const useModal = (initValue = false) => {
  const [isOpen, setIsOpen] = useState(initValue);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen((prevState) => !prevState);

  return { isOpen, openModal, closeModal, toggleModal };
};

export default useModal;
