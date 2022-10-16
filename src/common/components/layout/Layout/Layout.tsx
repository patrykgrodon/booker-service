import { Box } from "@mui/material";
import { makeSx } from "common/styles/makeSx";
import Header from "../Header/Header";
interface LayoutProps {
  children: React.ReactNode;
}

const sxContainer = makeSx(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const sxMain = makeSx(() => ({
  flex: 1,
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
}));

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={sxContainer}>
      <Header />
      <Box sx={sxMain}>{children}</Box>
    </Box>
  );
};

export default Layout;
