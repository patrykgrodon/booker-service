import { Box, useMediaQuery, useTheme } from "@mui/material";
import { TOOLBAR_HEIGHT } from "common/constants/layout";
import useSidebar from "common/hooks/useSidebar";
import { makeSx } from "common/styles/makeSx";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
interface LayoutProps {
  children: React.ReactNode;
}

const sxContainer = makeSx(() => ({
  display: "flex",
  height: "100vh",
  maxHeight: "100vh",
}));

const sxMain = makeSx(() => ({
  flexGrow: 1,
  marginTop: TOOLBAR_HEIGHT,
  minHeight: `calc(100vh - ${TOOLBAR_HEIGHT})`,
  maxHeight: `calc(100vh - ${TOOLBAR_HEIGHT})`,
  overflow: "auto",
}));

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const isWindowBelowMdSize = useMediaQuery(theme.breakpoints.down("md"));
  const isWindowBelowSmSize = useMediaQuery(theme.breakpoints.down("sm"));
  const { isSidebarOpen, toggleSidebar, hideSidebar } =
    useSidebar(isWindowBelowMdSize);

  return (
    <Box sx={sxContainer}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar
        isOpen={isSidebarOpen}
        handleHideSidebar={hideSidebar}
        isWindowBelowMdSize={isWindowBelowMdSize}
        isWindowBelowSmSize={isWindowBelowSmSize}
      />
      <Box component="main" sx={sxMain}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
