import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

import { Route } from "routes/routes";

export type SidebarItem = {
  label: string;
  icon: React.ElementType;
  path: Route;
};

const MyNavLink = forwardRef<any, any>((props, ref) => (
  <NavLink
    ref={ref}
    to={props.to}
    className={({ isActive }) =>
      isActive ? props.className + " sidebar-item-active" : props.className
    }
    onClick={props.onClick}
    onKeyDown={props.onKeyDown}
  >
    {props.children}
  </NavLink>
));

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
  return (
    <Box
      sx={{
        "& .sidebar-item": {
          color: (theme) => theme.palette.text.primary,
        },
        "& .sidebar-item-active": {
          display: "block",
          backgroundColor: (theme) => theme.palette.action.hover,
        },
      }}
    >
      <ListItem
        // @ts-ignore
        component={MyNavLink}
        // @ts-ignore
        to={path}
        onClick={closeSidebar}
        onKeyDown={(e: any) => e.keyCode === 13 && closeSidebar()}
        className="sidebar-item"
        disablePadding
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
      </ListItem>{" "}
    </Box>
  );
};

export default SidebarItem;
