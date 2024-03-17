import { JSX } from "react";

import { OrganizationSwitcher } from "@/components/containers/navigation/organization-switcher";
import { MenuBar } from "@/components/containers/navigation/menu-bar";
import { UserMenu } from "@/components/containers/navigation/user-menu";

export function NavigationBar(): JSX.Element {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="mr-4">
              <img src="/logo.png" alt="Logo" className="h-12" />
            </div>

            <OrganizationSwitcher />

            <MenuBar />

            <div className="ml-auto flex items-center space-x-4">
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
