import { useState } from "react";

const useMenu = () => {
  const [menuEl, setMenuEl] = useState<Element | null>(null);

  const openMenu = (element: Element) => {
    setMenuEl(element);
  };

  const closeMenu = () => {
    setMenuEl(null);
  };

  return { menuEl, openMenu, closeMenu };
};

export default useMenu;
