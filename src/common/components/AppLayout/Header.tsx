import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { Logo } from "..";
import { Menu } from "@mui/icons-material";
import UserMenu from "./UserMenu";

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleSidebar}
        >
          <Menu />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
