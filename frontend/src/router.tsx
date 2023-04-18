import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const AuthenticatedLayout = loadable(() => import('./layouts/authenticated'));
const UnauthenticatedLayout = loadable(() => import('./layouts/unauthenticated'));

const HomePage = loadable(() => import('./pages/Home'));
const SignUpPage = loadable(() => import('./pages/SignUp'));
const SignInPage = loadable(() => import('./pages/SignIn'));
const SignOutPage = loadable(() => import('./pages/SignOut'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<UnauthenticatedLayout />}>
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="register" element={<SignUpPage />} />

        <Route path="sign-in" element={<SignInPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="login" element={<SignInPage />} />
      </Route>

      <Route element={<AuthenticatedLayout />}>
        <Route path="sign-out" element={<SignOutPage />} />
        <Route path="signout" element={<SignOutPage />} />
        <Route path="logout" element={<SignOutPage />} />

        <Route path="/" element={<HomePage />} />
      </Route>
    </>,
  ),
);
