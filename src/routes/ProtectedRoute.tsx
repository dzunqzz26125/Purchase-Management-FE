import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { getAccessToken } from "../api/client";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getAccessToken();
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
