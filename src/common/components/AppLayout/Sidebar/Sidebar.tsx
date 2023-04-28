import { CottageOutlined } from "@mui/icons-material";
import { List, useMediaQuery } from "@mui/material";

import { routes } from "routes";
import SidebarItem, { SidebarItem as SidebarItemType } from "./SidebarItem";
import { Drawer } from "./styledDrawer";
import theme from "theme";

type SidebarProps = {
  isOpen: boolean;
};

const sidebarItems: SidebarItemType[] = [
  { label: "Dashboard", icon: CottageOutlined, path: routes.base },
];

const Sidebar = ({ isOpen }: SidebarProps) => {
  const isWindowBelowSmSize = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Drawer
      variant="permanent"
      open={isOpen}
      sx={{
        position: isWindowBelowSmSize ? "absolute" : "static",
        display: !isOpen && isWindowBelowSmSize ? "none" : "block",
        ...(isWindowBelowSmSize ? { width: "100vw !important" } : {}),
      }}
      PaperProps={{
        sx: {
          position: "static",
          ...(isWindowBelowSmSize ? { width: "100vw !important" } : {}),
        },
      }}
    >
      <List>
        {sidebarItems.map(({ label, icon, path }) => (
          <SidebarItem
            key={label}
            path={path}
            label={label}
            isOpen={isOpen}
            icon={icon}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
