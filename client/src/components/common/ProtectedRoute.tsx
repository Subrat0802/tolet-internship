import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../main";

export const ProtectedRoute = () => {
  const user = useSelector((state: RootState) => state.userState);
  // console.log("user from session", user)
  return user ? <Outlet /> : <Navigate to="/auth" replace />;
};
