import { Avatar, SxProps } from "@mui/material";

type UserAvatarProps = {
  userInitials: string;
  url?: string;
  sx?: SxProps;
  size?: "small" | "medium" | "large";
};

const avatarSizes = {
  small: 30,
  medium: 40,
  large: 50,
};

const UserAvatar = ({
  userInitials,
  url,
  sx,
  size = "medium",
}: UserAvatarProps) => {
  const width = avatarSizes[size];
  const height = avatarSizes[size];

  return (
    <Avatar src={url} sx={{ width, height, ...sx }} aria-label="user avatar">
      {userInitials}
    </Avatar>
  );
};

export default UserAvatar;
