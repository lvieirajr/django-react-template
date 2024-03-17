import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth0 } from "@/components/providers/auth0";

export function UnauthenticatedLayout(): ReactNode {
  const { isLoading, user } = useAuth0();

  if (isLoading) {
    return null;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
