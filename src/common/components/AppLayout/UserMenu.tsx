import { LogoutOutlined } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  Menu,
  Typography,
} from "@mui/material";
import { useMenu } from "common/hooks";
import { useAuth } from "modules/auth/contexts/authContext";
import UserAvatar from "./UserAvatar";

const UserMenu = () => {
  const { menuEl, openMenu, closeMenu } = useMenu();
  const { user, logout, hasUserCompleteRegister } = useAuth();

  const handleOpenMenu: React.MouseEventHandler<HTMLButtonElement> = (e) =>
    openMenu(e.currentTarget);

  const handleLogout = () => {
    logout();
  };

  const listItemActions = [
    {
      text: "Logout",
      Icon: LogoutOutlined,
      onClick: handleLogout,
    },
  ] as const;

  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <UserAvatar
          userInitials={
            hasUserCompleteRegister ? user?.companyName.slice(0, 2) || "" : ""
          }
        />
      </IconButton>
      <Menu open={!!menuEl} anchorEl={menuEl} onClose={closeMenu}>
        {hasUserCompleteRegister && (
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, lineHeight: 1 }}
            >
              {user?.companyName}
            </Typography>
            <Typography variant="caption"> {user?.email}</Typography>
          </ListItem>
        )}

        <Divider />
        {listItemActions.map(({ text, onClick, Icon }) => (
          <ListItemButton key={text} onClick={onClick}>
            <Icon fontSize="small" sx={{ mr: 1 }} />
            {text}
          </ListItemButton>
        ))}
      </Menu>
    </>
  );
};

export default UserMenu;
