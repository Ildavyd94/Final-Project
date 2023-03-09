import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.User.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/signIn" />;
};

export default ProtectedRoute;