import { useEffect } from "react";
import { Routes } from "./routePaths";

type Props = {
  route: Routes;
};

const RedirectToExternal = ({ route }: Props) => {
  useEffect(() => {
    window.location.replace(route);
  }, [route]);

  return null;
};

export default RedirectToExternal;
