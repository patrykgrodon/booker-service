import {
  CheckCircleOutlineOutlined,
  ErrorOutlineOutlined,
} from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";
import { Spinner } from "common/components";

type UserAvailableIconProps = {
  isFetching: boolean;
  available: boolean | undefined;
};

const UserAvailableIcon = ({
  isFetching,
  available,
}: UserAvailableIconProps) => {
  if (isFetching)
    return (
      <Tooltip title="Checking...">
        <Box sx={{ height: "17.5px" }}>
          <Spinner size={17.5} button sx={{ mr: 0.5 }} />
        </Box>
      </Tooltip>
    );
  if (available === true)
    return (
      <Tooltip title="The employee is available at this time">
        <CheckCircleOutlineOutlined
          fontSize="small"
          sx={{ color: "#4AB471", mr: 0.5 }}
        />
      </Tooltip>
    );

  if (available === false)
    return (
      <Tooltip title="The employee is unavailable at this time">
        <ErrorOutlineOutlined
          fontSize="small"
          sx={{ color: "#CF5C60", mr: 0.5 }}
        />
      </Tooltip>
    );

  return null;
};

export default UserAvailableIcon;
