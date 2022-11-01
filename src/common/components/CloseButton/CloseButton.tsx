import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { makeSx } from "common/styles/makeSx";

const sxCloseBtn = makeSx((theme) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[400],
}));

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <IconButton
      aria-label="Close"
      onClick={onClick}
      sx={sxCloseBtn}
      size="large">
      <Close />
    </IconButton>
  );
};
export default CloseButton;
