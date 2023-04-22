import React, { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, StyledEngineProvider, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import palette from './palette';

const ThemeProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 6 },
    }),
    [],
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />

        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
