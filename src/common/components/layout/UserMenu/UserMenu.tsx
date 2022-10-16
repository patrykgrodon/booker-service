import { ExitToApp } from "@mui/icons-material";
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useAuth } from "modules/auth/contexts/authContext";
import { getUserName, getUserType } from "modules/auth/utils/user";

interface UserMenuProps {
  anchorEl: Element | null;
  handleClose: () => void;
}

const UserMenu = ({ anchorEl, handleClose }: UserMenuProps) => {
  const { logout, user } = useAuth();
  const userName = getUserName(user);
  const userType = getUserType(user);
  return (
    <Menu
      keepMounted
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      sx={{ marginTop: (theme) => theme.spacing(0.5) }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          width: "150px",
          padding: (theme) => theme.spacing(0, 1.5, 0.5, 1.5),
        }}>
        <Typography align="right" variant="subtitle1">
          {userName}
        </Typography>
        <Typography variant="caption" align="right">
          {userType}
        </Typography>
      </Box>
      <Divider />
      <MenuItem onClick={logout} aria-label="logout">
        <ListItemIcon>
          <ExitToApp fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
