import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import { useAuth0 } from "@/components/providers/auth0";
import { NavigationBar } from "@/components/containers/navigation";

export function AuthenticatedLayout(): ReactNode {
  const { isLoading, loginWithRedirect, user } = useAuth0();

  if (!user) {
    if (!isLoading) {
      loginWithRedirect({ appState: { returnTo: window.location.pathname } });
    }

    return null;
  }

  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}
