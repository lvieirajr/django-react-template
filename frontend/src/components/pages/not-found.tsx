import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

export function NotFoundPage(): ReactElement {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container">
        <div className="text-center">
          <h1 className="text-6xl font-semibold">{t("pages.notFound.status")}</h1>
          <p className="text-xl font-light md:text-2xl">{t("pages.notFound.header")}</p>
          <p className="mt-4">{t("pages.notFound.description")}</p>

          <Button className="mt-6" asChild>
            <Link to="/">{t("pages.home.title")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
