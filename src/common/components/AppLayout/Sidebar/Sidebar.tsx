import { CottageOutlined } from "@mui/icons-material";
import { List } from "@mui/material";
import { routes } from "routes";
import SidebarItem, { SidebarItem as SidebarItemType } from "./SidebarItem";
import { Drawer } from "./StyledDrawer";

type SidebarProps = {
  isOpen: boolean;
};

const sidebarItems: SidebarItemType[] = [
  { label: "Dashboard", icon: CottageOutlined, path: routes.base },
];

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <Drawer
      PaperProps={{ sx: { position: "static" } }}
      variant="permanent"
      open={isOpen}
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
