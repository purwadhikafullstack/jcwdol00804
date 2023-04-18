import React from "react";
import { Outlet } from "react-router-dom";
import NotFound from "../Pages/NotFound";

const RestrictedRoutes = () => {
  const isAuth = localStorage.getItem("xmart_login");
  return isAuth ? <Outlet /> : <NotFound />;
};

export default RestrictedRoutes;
