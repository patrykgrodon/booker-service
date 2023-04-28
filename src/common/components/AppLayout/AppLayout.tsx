import { Box } from "@mui/material";

import { useSidebar } from "common/hooks";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isOpen, toggleSidebar } = useSidebar();
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Header toggleSidebar={toggleSidebar} />
      <Box
        sx={{
          display: "flex",
          flex: 1,
        }}
      >
        <Sidebar isOpen={isOpen} />
        <Box
          component="main"
          sx={{
            flex: 1,
            height: "100%",
            maxHeight: "100%",
            overflow: "auto",
            p: { xs: 1, sm: 2, md: 4, lg: 5 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
