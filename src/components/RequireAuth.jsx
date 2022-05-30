import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const RequireAuth = () => {
  const isAuth = useSelector((state) => state.login.isAuth);
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="signin/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
