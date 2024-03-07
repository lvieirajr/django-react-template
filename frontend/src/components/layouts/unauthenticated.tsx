import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth0 } from "@/components/providers/auth0";
import { Loader } from "@/components/ui/loader";

export function UnauthenticatedLayout(): ReactNode {
  const { isLoading, user } = useAuth0();

  if (isLoading) {
    return <Loader variant="page" />;
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
