import { CottageOutlined, Assignment } from "@mui/icons-material";
import { Box, List } from "@mui/material";
import { TOOLBAR_HEIGHT } from "common/constants/layout";
import { Routes } from "routes";
import CustomDrawer from "./CustomDrawer/CustomDrawer";
import SidebarItem from "./SidebarItem/SidebarItem";

const items = [
  { text: "Dashboard", icon: CottageOutlined, path: Routes.Dashboard },
  {
    text: "Services",
    icon: Assignment,
    path: Routes.Services,
  },
];

type Props = {
  isOpen: boolean;
  handleHideSidebar: () => void;
  isWindowBelowMdSize: boolean;
  isWindowBelowSmSize: boolean;
};

const Sidebar = ({
  isOpen,
  handleHideSidebar,
  isWindowBelowMdSize,
  isWindowBelowSmSize,
}: Props) => {
  return (
    <CustomDrawer
      variant="permanent"
      open={isOpen}
      sx={{
        position: isWindowBelowMdSize ? "absolute" : "initial",
        display: !isOpen && isWindowBelowMdSize ? "none" : "block",
        ...(isWindowBelowSmSize ? { width: "100vw !important" } : {}),
      }}
      PaperProps={{
        sx: {
          ...(isWindowBelowSmSize ? { width: "100vw !important" } : {}),
          zIndex: 0,
        },
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: TOOLBAR_HEIGHT,
          height: "100%",
          padding: (theme) => theme.spacing(0, 2),
        }}>
        <List
          sx={{
            padding: (theme) => theme.spacing(1, 0),
            marginBottom: "auto",
          }}>
          {items.map(({ text, icon: Icon, path }) => (
            <SidebarItem
              key={text}
              isOpen={isOpen}
              handleHideSidebar={handleHideSidebar}
              text={text}
              icon={Icon}
              path={path}
            />
          ))}
        </List>
      </Box>
    </CustomDrawer>
  );
};

export default Sidebar;
