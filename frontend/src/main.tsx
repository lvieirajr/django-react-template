import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

import { AuthenticationProvider } from './contexts/authentication';
import { router } from './router';
import ThemeProvider from './theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'x-csrftoken';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <AuthenticationProvider>
        <ThemeProvider>
          <HelmetProvider>
            <RouterProvider router={router} />
          </HelmetProvider>
        </ThemeProvider>
      </AuthenticationProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
