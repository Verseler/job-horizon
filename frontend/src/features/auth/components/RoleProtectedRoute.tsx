import { Navigate, Outlet, useLocation } from "react-router";

import { useAuth } from "@/features/auth";
import type { UserRole } from "@/types";

type RoleProtectedRouteProps = {
  allowedRoles: Array<UserRole | undefined> | null;
};

export default function RoleProtectedRoute({
  allowedRoles,
}: RoleProtectedRouteProps) {
  const location = useLocation();
  const { user, token } = useAuth();
  const userRole = user?.role;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.log("allowed roles: ", allowedRoles, " role ", userRole);
    return <Navigate to="/not-found" replace />;
  }

  return <Outlet />;
}
