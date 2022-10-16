import { Avatar, IconButton, Tooltip } from "@mui/material";

import { avatar } from "assets";
import useMenu from "common/hooks/useMenu";
import { useAuth } from "modules/auth/contexts/authContext";
import { getUserName } from "modules/auth/utils/user";
import UserMenu from "../../UserMenu/UserMenu";

const UserAvatar = () => {
  const { menuEl, closeMenu, openMenu } = useMenu();
  const { user } = useAuth();
  const userName = getUserName(user);

  const handleOpenMenu = (e: any) => openMenu(e.target);

  return (
    <>
      <Tooltip title="User menu">
        <IconButton aria-label="open user menu" onClick={handleOpenMenu}>
          <Avatar alt={userName} src={avatar} />
        </IconButton>
      </Tooltip>
      <UserMenu anchorEl={menuEl} handleClose={closeMenu} />
    </>
  );
};

export default UserAvatar;
