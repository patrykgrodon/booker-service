import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { routes } from "./routes";
import { AuthLayout } from "modules/auth/components";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.login} element={<AuthLayout>login</AuthLayout>} />
        <Route path="*" element={<Navigate replace to={routes.login} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
