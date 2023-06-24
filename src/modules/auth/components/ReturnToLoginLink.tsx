import { Link } from "react-router-dom";
import { Button, ButtonProps, Link as MuiLink } from "@mui/material";
import { routes } from "routes";

type ReturnToLoginLinkProps = {
  text?: string;
} & (
  | {
      asButton?: false;
    }
  | ({ asButton: true } & Pick<ButtonProps, "fullWidth" | "sx">)
);

const ReturnToLoginLink = ({
  text = "Return to login view",
  asButton,
  ...buttonProps
}: ReturnToLoginLinkProps) => {
  if (asButton)
    return (
      <Button component={Link} to={routes.login} {...buttonProps}>
        {text}
      </Button>
    );
  return (
    <MuiLink component={Link} to={routes.login}>
      {text}
    </MuiLink>
  );
};

export default ReturnToLoginLink;
