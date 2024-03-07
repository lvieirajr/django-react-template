import { ReactElement } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function NotFoundPage(): ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container">
        <div className="text-center">
          <h1 className="text-6xl font-semibold">404</h1>
          <p className="text-xl font-light md:text-2xl">Page Not Found</p>
          <p className="mt-4">The page you are looking for does not exist.</p>

          <Button className="mt-6" asChild>
            <Link to="/">Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
