import { JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

export function MenuBar(): JSX.Element {
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="mx-8 flex items-center space-x-6 lg:space-x-8">
      <Link
        to="/"
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          isActive("/") ? "text-primary" : "",
        )}
      >
        {t("pages.home.title")}
      </Link>
    </nav>
  );
}
