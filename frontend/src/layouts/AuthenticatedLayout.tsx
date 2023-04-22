import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

import NavBar from '../components/NavBar';
import useAuthentication from '../contexts/authentication';
import SEOHelmet from '../components/SEOHelmet';

const AuthenticatedLayout: React.FC = () => {
  const { user } = useAuthentication();

  if (!user?.id) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <>
      <SEOHelmet />

      <Container component="main" maxWidth="xs">
        <NavBar />
        <Outlet />
      </Container>
    </>
  );
};

export default AuthenticatedLayout;
