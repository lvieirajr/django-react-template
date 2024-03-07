import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

export function ErrorLayout(): ReactNode {
  return (
    <>
      <Outlet />
    </>
  );
}
