import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Auth0Provider } from "@/components/providers/auth0";
import { ThemeProvider } from "@/components/providers/theme";
import App from "@/app";

import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <BrowserRouter basename="/">
        <QueryClientProvider client={new QueryClient()}>
          <Auth0Provider>
            <App />
          </Auth0Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
