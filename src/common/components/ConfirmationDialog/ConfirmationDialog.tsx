import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Check, Warning } from "@mui/icons-material";
import { CloseButton, RequestButton } from "common/components";
import { Link } from "react-router-dom";

type CommonProps = {
  type: "error" | "success";
  open: boolean;
  title: string;
  mainButtonText: string;
  text?: string;
  oneAction?: boolean;
  isLoading?: boolean;
  buttonIcon?: any;
  closeButtonText?: string;
  handleClose: () => void;
  SecondButton?: JSX.Element;
};

type PropsAsLink = CommonProps & {
  isLink: true;
  path: string;
};

type PropsAsButton = CommonProps & {
  isLink?: false;
  handleClick: () => any;
};

const ConfirmationDialog = ({
  open,
  title,
  text,
  type,
  mainButtonText,
  closeButtonText = "Close",
  isLoading = false,
  buttonIcon: ButtonIcon,
  oneAction = false,
  handleClose,
  SecondButton,
  ...props
}: PropsAsLink | PropsAsButton) => {
  const MainAction = () => {
    const commonProps = {
      fullWidth: true,
      startIcon: ButtonIcon && <ButtonIcon />,
      color: type,
    };

    if (props.isLink) {
      return (
        <Button component={Link} to={props.path} {...commonProps}>
          {mainButtonText}
        </Button>
      );
    }
    return (
      <RequestButton
        onClick={props.handleClick}
        isLoading={isLoading}
        {...commonProps}
      >
        {mainButtonText}
      </RequestButton>
    );
  };

  const SecondaryButton = () =>
    SecondButton || (
      <Button
        fullWidth
        onClick={handleClose}
        variant="outlined"
        color="primary"
        aria-label="secondary button"
      >
        {closeButtonText}
      </Button>
    );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { padding: 4, minWidth: "300px", maxWidth: "420px" } }}
    >
      <CloseButton onClick={handleClose} />

      {type === "error" ? (
        <Warning
          sx={{
            color: (theme) => theme.palette.error.main,
            margin: "0 auto",
            fontSize: 64,
          }}
        />
      ) : (
        <Check
          sx={{
            color: (theme) => theme.palette.success.main,
            margin: "0 auto",
            fontSize: 64,
          }}
        />
      )}

      <DialogTitle
        sx={{
          color: (theme) =>
            type === "error"
              ? theme.palette.error.dark
              : theme.palette.success.dark,
          textAlign: "center",
        }}
      >
        {title}
      </DialogTitle>
      {text && (
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
      )}
      {oneAction ? (
        <DialogActions>
          <MainAction />
        </DialogActions>
      ) : (
        <DialogActions
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            "& button:last-child": {
              marginBottom: { xs: 1, sm: 0 },
              marginLeft: { xs: 0, sm: 1 },
              order: { xs: -1, sm: 0 },
            },
          }}
        >
          <SecondaryButton />
          <MainAction />
        </DialogActions>
      )}
    </Dialog>
  );
};
export default ConfirmationDialog;
