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
import { makeSx } from "common/styles/makeSx";
import { useAuth } from "modules/auth/contexts/authContext";
import { getUserName, getUserType } from "modules/auth/utils/user";

interface UserMenuProps {
  anchorEl: Element | null;
  handleClose: () => void;
}

const sxMenu = makeSx((theme) => ({
  "& .MuiPaper-root": {
    marginTop: theme.spacing(1),
  },
}));

const sxUserInfo = makeSx((theme) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  width: "150px",
  padding: theme.spacing(0, 1.5, 0.5, 1.5),
}));

const UserMenu = ({ anchorEl, handleClose }: UserMenuProps) => {
  const { logout, account } = useAuth();
  const userName = getUserName(account);
  const userType = getUserType(account);
  return (
    <Menu
      keepMounted
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      sx={sxMenu}>
      <Box component="header" aria-label="user info" sx={sxUserInfo}>
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
