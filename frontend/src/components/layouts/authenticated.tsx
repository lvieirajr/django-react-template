import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import { useAuth0 } from "@/components/providers/auth0";
import { Loader } from "@/components/ui/loader";

export function AuthenticatedLayout(): ReactNode {
  const { isLoading, loginWithRedirect, user } = useAuth0();

  if (!user) {
    if (!isLoading) {
      loginWithRedirect({ appState: { returnTo: window.location.pathname } });
    }

    return <Loader variant="page" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
