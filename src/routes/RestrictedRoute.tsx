import { Navigate } from "react-router-dom";
import { Routes } from "./routePaths";

type Props = {
  children: JSX.Element;
};

const RestrictedRoute = ({ children }: Props) => {
  const isRestricted = Boolean("s");

  return !isRestricted ? children : <Navigate replace to={Routes.Base} />;
};
export default RestrictedRoute;
