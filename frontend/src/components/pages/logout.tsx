import { ReactElement, useEffect } from "react";

import { useAuth0 } from "@/components/providers/auth0";

export function LogoutPage(): ReactElement {
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

  return <></>;
}
