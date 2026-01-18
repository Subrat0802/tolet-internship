import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const user = sessionStorage.getItem("user");
  return user ? <Outlet /> : <Navigate to="/auth" replace />;
};
