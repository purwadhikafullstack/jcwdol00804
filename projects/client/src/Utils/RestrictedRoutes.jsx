import React from "react";
import { Outlet } from "react-router-dom";
import NotFound from "../Pages/NotFound";
import { useSelector } from "react-redux";

const RestrictedRoutes = () => {
  const { isLogged, is_verified } = useSelector((state) => {
    return {
      branchName: state.storeReducer.defaultStore,
      isLogged: state.userReducer.id,
      is_verified: state.userReducer.is_verified,
    };
  });
  if (is_verified && isLogged) {
    return <Outlet />;
  } else {
    return <NotFound />;
  }
};

export default RestrictedRoutes;
