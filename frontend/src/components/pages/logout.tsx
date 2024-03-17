import { ReactNode, useEffect } from "react";

import { useAuth0 } from "@/components/providers/auth0";

export function LogoutPage(): ReactNode {
  const { logout } = useAuth0();

  useEffect(() => {
    async function performLogout() {
      await logout({
        openUrl(url) {
          window.location.replace(url);
        },
      });
    }

    performLogout().then();
  }, [logout]);

  return null;
}
