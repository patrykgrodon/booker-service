import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { forwardRef, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { Routes } from "routes";
import useStyles from "./styles";

interface SidebarItemProps {
  path: Routes;
  text: string;
  icon: React.ElementType;
  handleHideSidebar: () => void;
  isOpen: boolean;
  isLinkExternal?: boolean;
}

const SidebarItem = ({
  path,
  text,
  icon: Icon,
  handleHideSidebar,
  isOpen,
  isLinkExternal = false,
}: SidebarItemProps) => {
  const classes = useStyles();

  const MyNavLink = useMemo(
    () =>
      forwardRef<any, any>((props, ref) => (
        <NavLink
          ref={ref}
          to={props.to}
          {...(isLinkExternal ? { target: "_blank" } : {})}
          onClick={handleHideSidebar}
          className={({ isActive }) =>
            `${props.className} ${isActive ? props.activeClassName : ""}`
          }>
          {props.children}
        </NavLink>
      )),
    [handleHideSidebar, isLinkExternal]
  );
  return (
    <ListItem
      component={MyNavLink}
      to={path}
      className={classes.listItem}
      activeClassName={classes.activeListItem}>
      <ListItemIcon className={classes.listItemIcon}>
        <Icon fontSize="small" />
      </ListItemIcon>
      <ListItemText
        disableTypography
        sx={{ opacity: isOpen ? 1 : 0 }}
        primary={
          <Typography className={classes.text} component="span">
            {text}
          </Typography>
        }
      />
    </ListItem>
  );
};
export default SidebarItem;
