import { useEffect, useState } from "react";
import { saveLSItem, getLSItem } from "utils/webStorage";

const useSidebar = (isWindowBelowMdSize: boolean) => {
  const storageSidebarOpenState = getLSItem("isSidebarOpen");
  const initialSidebarOpenState = isWindowBelowMdSize
    ? false
    : !!storageSidebarOpenState;
  const [isSidebarOpen, setSidebarOpen] = useState(initialSidebarOpenState);

  useEffect(() => {
    setSidebarOpen(initialSidebarOpenState);
  }, [isWindowBelowMdSize, initialSidebarOpenState]);

  const toggleSidebar = () => {
    setSidebarOpen((isOpen) => {
      saveLSItem("isSidebarOpen", !isOpen);
      return !isOpen;
    });
  };
  const hideSidebar = () => {
    if (!isWindowBelowMdSize) return;
    setSidebarOpen(false);
    saveLSItem("isSidebarOpen", false);
  };

  return { isSidebarOpen, toggleSidebar, hideSidebar };
};

export default useSidebar;
