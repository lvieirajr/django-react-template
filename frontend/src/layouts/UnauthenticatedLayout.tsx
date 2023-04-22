import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

import SEOHelmet from '../components/SEOHelmet';
import { useAuthentication } from '../contexts/authentication';

const UnauthenticatedLayout: React.FC = () => {
  const { user } = useAuthentication();

  if (user?.id) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <SEOHelmet />

      <Container component="main" maxWidth="xs">
        <Outlet />
      </Container>
    </>
  );
};

export default UnauthenticatedLayout;
