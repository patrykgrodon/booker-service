import { useAuth } from "modules/auth/contexts/authContext";
import { Navigate } from "react-router-dom";
import { Routes } from "./routePaths";

type Props = {
  children: JSX.Element;
};

const RestrictedRoute = ({ children }: Props) => {
  const { user } = useAuth();
  const isRestricted = Boolean(user);

  return !isRestricted ? children : <Navigate replace to={Routes.Base} />;
};
export default RestrictedRoute;
