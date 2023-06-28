import { useState } from "react";
import { getLSItem, saveLSItem } from "common/utils/webStorage";
import { lsNames } from "common/constants/webStorageItems";

const useSidebar = () => {
  const sidebarLsValue = getLSItem<boolean>(lsNames.sidebar);
  const [isOpen, setIsOpen] = useState(
    sidebarLsValue === undefined ? false : sidebarLsValue
  );

  const toggleSidebar = () => {
    setIsOpen((prevState) => {
      saveLSItem(lsNames.sidebar, !prevState);
      return !prevState;
    });
  };

  const closeSidebar = () => {
    setIsOpen(false);
    saveLSItem(lsNames.sidebar, false);
  };

  return { isOpen, toggleSidebar, closeSidebar };
};

export default useSidebar;
