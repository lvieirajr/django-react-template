import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

export function HomePage(): ReactElement {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <img src="/logo.png" alt="Logo" className="mx-auto h-32 w-auto" />
        <p className="mt-4 text-lg">{t("pages.home.welcomeMessage")}</p>
      </div>
    </div>
  );
}
