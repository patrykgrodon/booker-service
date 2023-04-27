import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.login} element={<div>login</div>} />
        <Route path="*" element={<Navigate replace to={routes.login} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
