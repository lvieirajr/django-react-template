import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import SEOHelmet from '../components/SEOHelmet';

const ErrorLayout: React.FC = () => {
  return (
    <>
      <SEOHelmet />

      <Container component="main" maxWidth="xs">
        <Outlet />
      </Container>
    </>
  );
};

export default ErrorLayout;
