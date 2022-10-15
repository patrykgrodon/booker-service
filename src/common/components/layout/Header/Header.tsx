import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { avatar } from "assets";
import { useAuth } from "modules/auth/contexts/authContext";

const Header = () => {
  const { user, logout } = useAuth();

  const userName = user ? `${user.firstName} ${user.lastName}` : "Brak danych";

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Booker service
        </Typography>
        <Tooltip title="Wyloguj">
          <IconButton sx={{ p: 0 }} onClick={logout}>
            <Avatar alt={userName} src={avatar} />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
