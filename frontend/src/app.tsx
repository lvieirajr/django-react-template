import { JSX } from "react";
import { Route, Routes } from "react-router-dom";

import { AuthenticatedLayout } from "./components/layouts/authenticated";

import { ErrorLayout } from "@/components/layouts/error";
import { UnauthenticatedLayout } from "@/components/layouts/unauthenticated";
import { HomePage } from "@/components/pages/home";
import { LogoutPage } from "@/components/pages/logout";
import { NotFoundPage } from "@/components/pages/not-found";
import { ProfilePage } from "@/components/pages/profile";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<AuthenticatedLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route element={<UnauthenticatedLayout />}></Route>

      <Route element={<ErrorLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="logout" element={<LogoutPage />} />
    </Routes>
  );
}
