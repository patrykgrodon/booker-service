import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { Route } from "routes/routes";

export type SidebarItem = {
  label: string;
  icon: React.ElementType;
  path: Route;
};

type SidebarItemProps = SidebarItem & {
  isOpen: boolean;
  closeSidebar: () => void;
};

const SidebarItem = ({
  label,
  icon: Icon,
  isOpen,
  path,
  closeSidebar,
}: SidebarItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    navigate(path);
    closeSidebar();
  };

  const highlightItem = matchPath(`${path}/*`, location.pathname);

  return (
    <ListItem
      onClick={handleNavigate}
      onKeyDown={(e: any) => e.keyCode === 13 && handleNavigate()}
      disablePadding
      sx={{
        display: "block",
        backgroundColor: (theme) =>
          highlightItem ? theme.palette.action.hover : undefined,
      }}
    >
      <Tooltip title={isOpen ? undefined : label}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: isOpen ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: isOpen ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <Icon />
          </ListItemIcon>
          <ListItemText
            primary={label}
            primaryTypographyProps={{ variant: "subtitle1" }}
            sx={{ opacity: isOpen ? 1 : 0, fontWeight: 700 }}
          />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};

export default SidebarItem;
