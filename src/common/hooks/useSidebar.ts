import { useState } from "react";
import { getLSItem, saveLSItem } from "common/utils/webStorage";

const useSidebar = () => {
  const sidebarLsName = "isSidebarOpen";
  const sidebarLsValue = getLSItem<boolean>(sidebarLsName);
  const [isOpen, setIsOpen] = useState(
    sidebarLsValue === undefined ? true : sidebarLsValue
  );

  const toggleSidebar = () => {
    setIsOpen((prevState) => {
      saveLSItem(sidebarLsName, !prevState);
      return !prevState;
    });
  };

  const closeSidebar = () => {
    setIsOpen(false);
    saveLSItem(sidebarLsName, false);
  };

  return { isOpen, toggleSidebar, closeSidebar };
};

export default useSidebar;
