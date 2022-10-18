import { useAuth } from "modules/auth/contexts/authContext";
import { Navigate } from "react-router-dom";
import { Routes } from "./routePaths";

type Props = {
  children: JSX.Element;
};

const RestrictedRoute = ({ children }: Props) => {
  const { account } = useAuth();
  const isRestricted = Boolean(account);

  return !isRestricted ? children : <Navigate replace to={Routes.Base} />;
};
export default RestrictedRoute;
