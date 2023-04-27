import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import { routes } from "routes";

type ReturnToLoginLinkProps = {
  text?: string;
};

const ReturnToLoginLink = ({ text }: ReturnToLoginLinkProps) => {
  return (
    <MuiLink component={Link} to={routes.login}>
      {text || "Return to login view"}
    </MuiLink>
  );
};

export default ReturnToLoginLink;
