import { ReactElement } from "react";

export function HomePage(): ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <img src="/logo.png" alt="Logo" className="mx-auto h-32 w-auto" />
        <p className="mt-4 text-lg">Django React Template</p>
      </div>
    </div>
  );
}
