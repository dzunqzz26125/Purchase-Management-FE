import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = JSON.parse(localStorage.getItem("accessToken") || "null");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
