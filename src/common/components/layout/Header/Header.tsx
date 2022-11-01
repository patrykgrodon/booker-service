import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import UserAvatar from "./UserAvatar/UserAvatar";
import { TOOLBAR_HEIGHT } from "common/constants/layout";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1,
        backgroundColor: (theme) => theme.palette.primary.dark,
        height: TOOLBAR_HEIGHT,
      }}>
      <Toolbar sx={{ height: "100%" }}>
        <IconButton
          onClick={toggleSidebar}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ margin: (theme) => theme.spacing(0, 2, 0, -0.6) }}>
          <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Booker service
        </Typography>
        <UserAvatar />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
